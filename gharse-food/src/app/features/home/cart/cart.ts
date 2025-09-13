import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { CartItem, CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnDestroy {
  items: CartItem[] = [];
  sub: Subscription;
  mobileOpen = false;

  constructor(private cart: CartService) {
    this.sub = this.cart.cart$.subscribe(it => this.items = it);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  increase(i: CartItem) { this.cart.changeQuantity(i.id, +1); }
  decrease(i: CartItem) { this.cart.changeQuantity(i.id, -1); }
  remove(i: CartItem) { this.cart.removeItem(i.id); }
  clear() { this.cart.clearCart(); }
  get total() { return this.cart.getTotal(); }

  toggleMobile() { this.mobileOpen = !this.mobileOpen; 
    
  } 

}
