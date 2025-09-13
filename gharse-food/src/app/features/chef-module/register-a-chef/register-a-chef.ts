import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-a-chef',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-a-chef.html',
  styleUrls: ['./register-a-chef.css']
})
export class RegisterAChef {
  step: number = 1;

  chefData: {
    name: string;
    email: string;
    location: string;
    profilePhoto?: string;
    cuisine?: string;
    specialties?: string;
    foodItems: { 
      photo?: string; 
      name: string; 
      description?: string; 
      price?: number; 
    }[];
    idProof?: string;
    bankDetails?: string;
  } = {
    name: '',
    email: '',
    location: '',
    foodItems: []
  };

  nextStep() {
    if (this.step < 4) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onProfilePhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.chefData.profilePhoto = URL.createObjectURL(input.files[0]);
    }
  }

  addFoodItem() {
    this.chefData.foodItems.push({ name: '', description: '', price: undefined });
  }

  onFoodPhotoSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.chefData.foodItems[index].photo = URL.createObjectURL(input.files[0]);
    }
  }

  removeFoodItem(index: number) {
    this.chefData.foodItems.splice(index, 1);
  }

  onIdProofSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.chefData.idProof = input.files[0].name;
    }
  }

  submitForm() {
    console.log("Chef Registration Data:", this.chefData);
    alert("✅ Registration submitted! Pending Admin approval.");
  }
}
