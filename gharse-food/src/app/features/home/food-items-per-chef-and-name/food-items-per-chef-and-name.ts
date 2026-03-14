import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: string;
  isChefAvailable: boolean;
  imageUrl?: string;
  quantity: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

interface MenuResponse {
  menuItems: MenuItem[];
  categoryCounts: CategoryCount[];
}

@Component({
  selector: 'app-food-items-per-chef-and-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-items-per-chef-and-name.html',
  styleUrl: './food-items-per-chef-and-name.css',
})
export class FoodItemsPerChefAndName implements OnInit {
  chefId!: string;

  menuItems: MenuItem[] = [];
  categoryCounts: CategoryCount[] = [];
  orderedCategories: { category: string; items: MenuItem[] }[] = [];

  isLoading = true;
  activeCategory = '';
  cartCount = 0;
  showScrollTop = false;
  showChefSelector = false;
  chefSummary: { chefId: string; chefName: string; count: number }[] = [];

  private observer?: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.chefId = this.route.snapshot.paramMap.get('chefId')!;

    this.cartService.getCart().subscribe((cart) => {
      this.cartCount = this.cartService.getTotalItems();
      this.chefSummary = this.cartService.getChefWiseSummary();

      // 🔥 FIX: instant quantity sync
      this.syncMenuQuantities(cart);
    });

    this.loadMenu();
  }

  loadMenu(): void {
    this.http
      .get<MenuResponse>(`http://localhost:8080/api/chef/menu/${this.chefId}`)
      .subscribe((res) => {
        this.menuItems = res.menuItems.map((i) => ({ ...i, quantity: 0 }));
        this.categoryCounts = res.categoryCounts;
        this.buildOrderedCategories();
        this.syncMenuQuantities(this.cartService.getSnapshot());
        this.activeCategory = this.categoryCounts[0]?.category ?? '';
        this.isLoading = false;
        setTimeout(() => this.initObserver(), 0);
      });
  }

  buildOrderedCategories(): void {
    const map: Record<string, MenuItem[]> = {};
    this.menuItems.forEach((item) => (map[item.category] ??= []).push(item));
    this.orderedCategories = this.categoryCounts.map((c) => ({
      category: c.category,
      items: map[c.category] || [],
    }));
  }

  // private syncMenuQuantities(cart: any[]) {
  //   const map = new Map(cart.map((i) => [i.id, i.quantity]));
  //   this.menuItems.forEach((item) => (item.quantity = map.get(item.id) || 0));
  // }
  private syncMenuQuantities(cart: any[]) {
    const map = new Map(
      cart.filter(i => String(i.chefId) === String(this.chefId)).map((i) => [i.id, i.quantity]),
    );

    this.menuItems.forEach((item) => {
      item.quantity = map.get(item.id) || 0;
    });
  }
  scrollToCategory(category: string): void {
    this.activeCategory = category;
    document.getElementById(category)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  initObserver() {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) this.activeCategory = e.target.id;
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );

    document.querySelectorAll('.category-section').forEach((el) => this.observer!.observe(el));
  }

  addItem(item: MenuItem) {
    this.cartService.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      chefId: this.chefId,
      chefName: `Chef ${this.chefId}`,
    });
  }

  increment(item: MenuItem) {
    this.cartService.updateQuantity(item.id, this.chefId, item.quantity + 1);
  }

  decrement(item: MenuItem) {
    this.cartService.updateQuantity(item.id, this.chefId, item.quantity - 1);
  }

  openCartSelector() {
    if (this.chefSummary.length === 1) {
      this.openChefCart(this.chefSummary[0].chefId);
    } else {
      this.showChefSelector = true;
    }
  }

  openChefCart(chefId: string) {
    console.log('Navigating to cart with chefId:', chefId);

    this.showChefSelector = false;
    this.router.navigate(['/cart'], { queryParams: { chefId: chefId } });
  }
}
