import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-list',
  standalone : true,
   imports: [CommonModule, FormsModule],
  templateUrl: './food-list.html',
  styleUrls: ['./food-list.css']
})
export class FoodList {
  foods = [
    {
      name: 'Butter Chicken',
      description: 'Rich & creamy curry',
      price: 250,
      rating: 4.5,
      image: 'assets/foods/butter-chicken.jpg',
      quantity: 1
    },
    {
      name: 'Paneer Tikka',
      description: 'Smoky grilled paneer',
      price: 180,
      rating: 4.2,
      image: 'assets/foods/biryani.jpg',
      quantity: 1
    },
    {
      name: 'Veg Biryani',
      description: 'Aromatic rice with spices',
      price: 200,
      rating: 4.7,
      image: 'assets/foods/biryani.jpg',
      quantity: 1
    },
    {
      name: 'Gulab Jamun',
      description: 'Soft, sweet homemade dessert',
      price: 100,
      rating: 4.8,
      image: 'assets/foods/paneer-tikka.jpg',
      quantity: 1
    }
  ];

  cart: any[] = [];
  cartCount: number = 0;
  showCart: boolean = false;

  addToCart(food: any) {
    const existing = this.cart.find(item => item.name === food.name);
    if (existing) {
      existing.quantity += food.quantity;
    } else {
      this.cart.push({ ...food });
    }
    this.cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    food.quantity = 1; // reset input
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
