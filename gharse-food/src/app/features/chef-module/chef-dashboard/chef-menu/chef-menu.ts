import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Dish {
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-chef-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chef-menu.html',
  styleUrls: ['./chef-menu.css']
})
export class ChefMenu implements OnInit {
  dishes: Dish[] = [];
  isModalOpen = false;
  editIndex: number | null = null;
  dishForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      image: [null]
    });
  }

  openModal() {
    this.isModalOpen = true;
    this.editIndex = null;
    this.dishForm.reset();
    this.previewUrl = null;
  }

  editDish(index: number) {
    const dish = this.dishes[index];
    this.editIndex = index;
    this.dishForm.patchValue(dish);
    this.previewUrl = dish.imageUrl || null;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editIndex = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  addDish() {
    if (this.dishForm.invalid) return;
    const formValue = this.dishForm.value;
    const newDish: Dish = {
      name: formValue.name,
      category: formValue.category,
      price: formValue.price,
      description: formValue.description,
      imageUrl: this.previewUrl as string
    };

    if (this.editIndex !== null) {
      this.dishes[this.editIndex] = newDish;
    } else {
      this.dishes.push(newDish);
    }

    this.closeModal();
  }

  deleteDish(index: number) {
    this.dishes.splice(index, 1);
  }

  saveAll() {
    console.log('Saving dishes...', this.dishes);
    // TODO: API call to backend
    alert('All dishes saved successfully!');
  }
}
