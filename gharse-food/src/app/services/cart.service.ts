import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItem } from '../models/food-item.model';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private STORAGE_KEY = 'gharse_food_cart_v1';
  private items: CartItem[] = this.loadFromStorage();
  private subject = new BehaviorSubject<CartItem[]>([...this.items]);
  cart$ = this.subject.asObservable();

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    this.subject.next([...this.items]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  addItem(food: FoodItem, qty = 1) {
    const existing = this.items.find(i => i.id === food.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: qty
      });
    }
    this.save();
  }

  changeQuantity(id: number, delta: number) {
    const it = this.items.find(i => i.id === id);
    if (!it) return;
    it.quantity += delta;
    if (it.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.save();
    }
  }

  setQuantity(id: number, quantity: number) {
    const it = this.items.find(i => i.id === id);
    if (!it) return;
    it.quantity = quantity;
    if (it.quantity <= 0) this.removeItem(id);
    else this.save();
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((s, i) => s + i.price * i.quantity, 0);
  }
}
