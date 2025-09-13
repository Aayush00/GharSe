import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-display-food',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-display-food.html',
  styleUrls: ['./home-display-food.css']
})
export class HomeDisplayFood {
  allFoods = [
    { name: 'Butter Chicken', chefName: 'Chef Aayush', description: 'Creamy spiced chicken curry cooked to perfection.', price: 250, rating: 4.8, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Veg Biryani', chefName: 'Chef Pragya', description: 'Aromatic basmati rice cooked with fresh vegetables & spices.', price: 180, rating: 4.5, image: 'assets/foods/biryani.jpg' },
    { name: 'Paneer Tikka', chefName: 'Chef Sanjay', description: 'Marinated paneer cubes grilled with spices.', price: 200, rating: 4.7, image: 'assets/foods/paneer-tikka.jpg' },
    { name: 'Masala Dosa', chefName: 'Chef Shaily', description: 'Crispy dosa stuffed with spiced potato filling.', price: 120, rating: 4.6, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Rajma Chawal', chefName: 'Chef Pihu', description: 'Red kidney beans curry served with steamed rice.', price: 150, rating: 4.4, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Chicken Biryani', chefName: 'Chef Smriti', description: 'Fragrant rice layered with juicy chicken & spices.', price: 220, rating: 4.9, image: 'assets/foods/biryani.jpg' },
    { name: 'Butter Chicken', chefName: 'Chef Aayush', description: 'Creamy spiced chicken curry cooked to perfection.', price: 250, rating: 4.8, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Veg Biryani', chefName: 'Chef Pragya', description: 'Aromatic basmati rice cooked with fresh vegetables & spices.', price: 180, rating: 4.5, image: 'assets/foods/biryani.jpg' },
    { name: 'Paneer Tikka', chefName: 'Chef Sanjay', description: 'Marinated paneer cubes grilled with spices.', price: 200, rating: 4.7, image: 'assets/foods/paneer-tikka.jpg' },
    { name: 'Masala Dosa', chefName: 'Chef Shaily', description: 'Crispy dosa stuffed with spiced potato filling.', price: 120, rating: 4.6, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Rajma Chawal', chefName: 'Chef Pihu', description: 'Red kidney beans curry served with steamed rice.', price: 150, rating: 4.4, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Chicken Biryani', chefName: 'Chef Smriti', description: 'Fragrant rice layered with juicy chicken & spices.', price: 220, rating: 4.9, image: 'assets/foods/biryani.jpg' },
    { name: 'Butter Chicken', chefName: 'Chef Aayush', description: 'Creamy spiced chicken curry cooked to perfection.', price: 250, rating: 4.8, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Veg Biryani', chefName: 'Chef Pragya', description: 'Aromatic basmati rice cooked with fresh vegetables & spices.', price: 180, rating: 4.5, image: 'assets/foods/biryani.jpg' },
    { name: 'Paneer Tikka', chefName: 'Chef Sanjay', description: 'Marinated paneer cubes grilled with spices.', price: 200, rating: 4.7, image: 'assets/foods/paneer-tikka.jpg' },
    { name: 'Masala Dosa', chefName: 'Chef Shaily', description: 'Crispy dosa stuffed with spiced potato filling.', price: 120, rating: 4.6, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Rajma Chawal', chefName: 'Chef Pihu', description: 'Red kidney beans curry served with steamed rice.', price: 150, rating: 4.4, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Chicken Biryani', chefName: 'Chef Smriti', description: 'Fragrant rice layered with juicy chicken & spices.', price: 220, rating: 4.9, image: 'assets/foods/biryani.jpg' },
    { name: 'Butter Chicken', chefName: 'Chef Aayush', description: 'Creamy spiced chicken curry cooked to perfection.', price: 250, rating: 4.8, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Veg Biryani', chefName: 'Chef Pragya', description: 'Aromatic basmati rice cooked with fresh vegetables & spices.', price: 180, rating: 4.5, image: 'assets/foods/biryani.jpg' },
    { name: 'Paneer Tikka', chefName: 'Chef Sanjay', description: 'Marinated paneer cubes grilled with spices.', price: 200, rating: 4.7, image: 'assets/foods/paneer-tikka.jpg' },
    { name: 'Masala Dosa', chefName: 'Chef Shaily', description: 'Crispy dosa stuffed with spiced potato filling.', price: 120, rating: 4.6, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Rajma Chawal', chefName: 'Chef Pihu', description: 'Red kidney beans curry served with steamed rice.', price: 150, rating: 4.4, image: 'assets/foods/butter-chicken.jpg' },
    { name: 'Chicken Biryani', chefName: 'Chef Smriti', description: 'Fragrant rice layered with juicy chicken & spices.', price: 220, rating: 4.9, image: 'assets/foods/biryani.jpg' }
  
  ];

  foods: any[] = [];
  pageSize = 6; // number of items to load at once
  isLoading = false;

  constructor() {
    this.loadMore();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && !this.isLoading) {
      this.loadMore();
    }
  }

  loadMore(): void {
    if (this.foods.length >= this.allFoods.length) return;

    this.isLoading = true;
    setTimeout(() => { // simulate API delay
      const nextItems = this.allFoods.slice(this.foods.length, this.foods.length + this.pageSize);
      this.foods = [...this.foods, ...nextItems];
      this.isLoading = false;
    }, 1000);
  }
}
