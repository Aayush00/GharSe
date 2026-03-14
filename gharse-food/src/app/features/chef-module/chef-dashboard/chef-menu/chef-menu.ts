import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { environment } from '../../../../../environments/environment';

interface Dish {
  id?: number | null; // 🔑 required for edit
  name: string;
  category: string;
  price: number;
  preparationTime: number;
  spiceLevel: number;
  calories: number;
  servings: number;
  availableQuantity: number;
  chefId: string;
  discount?: number;
  startTime: string;
  endTime: string;
  description?: string;
  imageUrl?: string;
  isChefAvailable: boolean; // single source of truth
}

interface ApiResponse {
  message: string;
}

interface ChefMenuResponse {
  menuItems: Dish[];
  categoryCounts: {
    category: string;
    count: number;
  }[];
}

@Component({
  selector: 'app-chef-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule, HttpClientModule],
  templateUrl: './chef-menu.html',
  styleUrls: ['./chef-menu.css'],
})
export class ChefMenu implements OnInit {
  dishes: Dish[] = [];
  dishForm!: FormGroup;
  isModalOpen = false;
  editIndex: number | null = null;
  previewUrl: string | null = null;

  categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      preparationTime: ['', Validators.required],
      spiceLevel: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      calories: ['', Validators.required],
      servings: ['', Validators.required],
      availableQuantity: ['', Validators.required],
      discount: [0, Validators.min(0)],
      chefId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: [''],
    });

    const chefId = '02'; // Replace with actual chef ID retrieval logic
    this.loadMenuByChefId(chefId);

    // auto-sync every minute
    setInterval(() => {
      this.syncToggleWithTime();
      this.cdr.detectChanges();
    }, 60000);
  }

  /* ================= TIME UTILS ================= */

  private isWithinTimeRange(dish: Dish): boolean {
    const now = new Date();

    const [sh, sm] = dish.startTime.split(':').map(Number);
    const [eh, em] = dish.endTime.split(':').map(Number);

    const start = new Date();
    start.setHours(sh, sm, 0, 0);

    const end = new Date();
    end.setHours(eh, em, 0, 0);

    return now >= start && now <= end;
  }

  /* ================= AUTO TOGGLE ================= */

  private syncToggleWithTime(): void {
    // this.dishes.forEach((dish) => {
    //   // auto-enable ONLY if currently within time
    //   if (this.isWithinTimeRange(dish) && !dish.isChefAvailable) {
    //     dish.isChefAvailable = true;
    //   }
    // });
  }

  /* ================= AVAILABILITY ================= */

  getAvailability(dish: Dish) {
    return dish.isChefAvailable
      ? { available: true, label: 'Available', greyed: false }
      : { available: false, label: 'Unavailable', greyed: true };
  }

  toggleAvailability(dish: Dish, checked: boolean) {
    dish.isChefAvailable = checked;
  }

  /* ================= MODAL ================= */

  openModal() {
    this.isModalOpen = true;
    this.editIndex = null;
    this.previewUrl = null;
    this.dishForm.reset();
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
    this.previewUrl = null;
    this.dishForm.reset();
  }

  /* ================= IMAGE ================= */

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  /* ================= SAVE (ADD / EDIT) ================= */

  saveDish() {
    if (this.dishForm.invalid) return;

    const existing = this.editIndex !== null ? this.dishes[this.editIndex] : null;

    const dish: Dish = {
      ...this.dishForm.value,
      id: existing?.id ?? null, // 🔑 preserve ID
      imageUrl: this.previewUrl || null,
      isChefAvailable: existing?.isChefAvailable ?? false,
    };

    if (this.editIndex !== null) {
      this.dishes[this.editIndex] = { ...existing!, ...dish };
    } else {
      this.dishes.push(dish);
    }

    this.closeModal();
  }

  deleteDish(index: number) {
    if (confirm('Delete this dish?')) {
      this.dishes.splice(index, 1);
    }
  }

  /* ================= SAVE ALL ================= */

  saveAll() {
    if (!this.dishes.length) {
      alert('No dishes to save');
      return;
    }

    const payload = { dishes: this.dishes };

    this.http.post<Dish[]>(`${environment.apiBaseUrl}/chef/chefMenuList`, payload).subscribe({
      next: (savedDishes) => {
        this.dishes = savedDishes; // 🔑 IDs now stored
        alert('Menu saved successfully');
      },
      error: (err) => {
        console.error('Save failed:', err);
        alert('Failed to save menu');
      },
    });
  }
  /* ================= LOAD MENU ================= */
 loadMenuByChefId(chefId: string) {
    this.http
      .get<ChefMenuResponse>(`${environment.apiBaseUrl}/chef/menu/${chefId}`)
      .subscribe({
        next: (res) => {
          this.dishes = res.menuItems;
        },
        error: (err) => {
          console.error('Failed to load menu', err);
          alert('Failed to load menu');
        },
      });
  }
}
