import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../home/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-cart.html',
  styleUrls: ['./floating-cart.css'],
})
export class FloatingCart implements OnInit {
  cartCount = 0;
  chefSummary: { chefId: string; chefName: string; count: number }[] = [];
  showChefSelector = false;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
      this.chefSummary = this.cartService.getChefWiseSummary();
    });
  }

  goToCart() {
    if (!this.chefSummary.length) return;

    if (this.chefSummary.length === 1) {
      this.openChefCart(this.chefSummary[0].chefId);
    } else {
      this.showChefSelector = true;
    }
  }

  openChefCart(chefId: string) {
    this.showChefSelector = false;

    this.router.navigate(['/cart'], {
      queryParams: { chefId },
    });
  }

  closeSelector() {
    this.showChefSelector = false;
  }
}
