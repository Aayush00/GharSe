import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  chefId: string;
  chefName: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);

  /* ---------- OBSERVABLES ---------- */
  getCart() {
    return this.cart$.asObservable();
  }

  getSnapshot(): CartItem[] {
    return this.cart$.value;
  }

  /* ---------- MUTATIONS ---------- */
  addItem(item: CartItem) {
    const cart = [...this.cart$.value];
    const existing = cart.find(
      i => i.id === item.id && i.chefId === item.chefId
    );

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    this.cart$.next(cart);
  }

  updateQuantity(id: number, chefId: string, qty: number) {
    const updated = this.cart$.value
      .map(i =>
        i.id === id && i.chefId === chefId
          ? { ...i, quantity: qty }
          : i
      )
      .filter(i => i.quantity > 0);

    this.cart$.next(updated);
  }

  /* ---------- AGGREGATES ---------- */
  getTotalItems(): number {
    return this.cart$.value.reduce((s, i) => s + i.quantity, 0);
  }

  getChefItemCount(chefId: string): number {
    return this.cart$.value
      .filter(i => i.chefId === chefId)
      .reduce((s, i) => s + i.quantity, 0);
  }

  getChefTotal(chefId: string): number {
    return this.cart$.value
      .filter(i => i.chefId === chefId)
      .reduce((s, i) => s + i.price * i.quantity, 0);
  }

  getChefCart(chefId: string): CartItem[] {
    return this.cart$.value.filter(i => i.chefId === chefId);
  }

  getChefWiseSummary() {
    const map = new Map<string, { chefId: string; chefName: string; count: number }>();

    this.cart$.value.forEach(i => {
      if (!map.has(i.chefId)) {
        map.set(i.chefId, {
          chefId: i.chefId,
          chefName: i.chefName,
          count: 0
        });
      }
      map.get(i.chefId)!.count += i.quantity;
    });

    return Array.from(map.values());
  }
}
