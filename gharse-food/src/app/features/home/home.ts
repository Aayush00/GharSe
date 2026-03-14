// src/app/features/home/home.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { HomeDisplayFood } from './home-display-food/home-display-food';


interface Chef {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, NavbarComponent, HomeDisplayFood, FooterComponent],
})
export class HomeComponent implements OnInit {
  chefs: Chef[] = [];

  heroImages: string[] = [
    'assets/foods/biryani.jpg',
    'assets/foods/butter-chicken.jpg',
    'assets/foods/paneer-tikka.jpg'
  ];

  currentImageIndex = 0;
  defaultChefs: Chef[] = [
    { id: '01', name: 'Chef A' },
    { id: '02', name: 'Chef B' },
    { id: '03', name: 'Chef C' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCurrentLocation()
      .then((coords) => {
        console.log('User location:', coords);
        this.startHeroSlider();

        // TEMP: replace later with backend API
        this.chefs = [
          { id: '01', name: 'Nearby Chef 1' },
          { id: '02', name: 'Nearby Chef 2' },
          { id: '03', name: 'Nearby Chef 3' },
        ];
      })
      .catch((err) => {
        console.warn('Location not available:', err);
        this.chefs = this.defaultChefs;
      });
  }
  startHeroSlider() {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.heroImages.length;
    }, 4000);
  }

  openChefMenu(chefId: string) {
    this.router.navigate(['/restaurant', chefId]);
  }

  private getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    });
  }
}
