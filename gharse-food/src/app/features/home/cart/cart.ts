import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, CartItem } from './cart.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  chefId!: string;
  chefName = '';
  items: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 🔥 Wait for query param first
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('chefId');

      if (!id) {
        //this.router.navigate(['/']);
        return;
      }

      this.chefId = id;

      // 🔥 Then subscribe to cart
      this.cartService.getCart().subscribe((cart) => {
        const chefItems = cart.filter((item) => String(item.chefId) === String(this.chefId));

        this.items = chefItems;

        this.total = chefItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        this.chefName = chefItems.length > 0 ? chefItems[0].chefName : `Chef ${this.chefId}`;
      });
    });
  }

  increment(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.chefId, item.quantity + 1);
  }

  decrement(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.chefId, item.quantity - 1);
  }

  addMoreItems() {
    this.router.navigate(['/restaurant', this.chefId]);
  }
}
