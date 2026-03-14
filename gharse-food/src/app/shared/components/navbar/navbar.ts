import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isChefPage = false;
  isRegisterChefPage = false;
  isChefDashboard = false;
  userProfile: any = null;

  searchText = '';
  searchResults: any[] = [];
  showDropdown = false;
  private searchTimeout: any;

  selectedLocation: string = '';
  availableLocations: string[] = ['Delhi', 'Mumbai', 'Bangalore', 'Detect Again'];

  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isChefPage = event.url.includes('/new-to-us');
        this.isRegisterChefPage = event.url.includes('/register-a-chef');
        this.isChefDashboard = event.url.includes('/chef-dashboard');
      }
    });
  }

  ngOnInit(): void {
    this.detectLocation();
    this.userProfile = this.authService.getUserProfile();
  }

  /* ---------------- SEARCH ---------------- */

  onSearchInput() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      if (!this.searchText || this.searchText.trim().length < 2) {
        this.searchResults = [];
        this.showDropdown = false;
        return;
      }

      this.fetchSearchSuggestions(this.searchText.trim());
    }, 300);
  }

  // fetchSearchSuggestions(query: string) {
  //   this.http.get<any>('http://localhost:8080/api/search', {
  //     params: { q: query }
  //   }).subscribe(res => {
  //     const dishes = res?.dishes || [];
  //     const chefs = res?.chefs || [];
  //     if(chefs.length > 0) {
  //       chefs.forEach((chef: any) => {
  //         dishes.push(...chef.menu);
  //       });
  //     this.searchResults = this.removeDuplicates(dishes);
  //     this.showDropdown = this.searchResults.length > 0;
  //   });
  // }
  fetchSearchSuggestions(query: string) {
    this.http
      .get<any>('http://localhost:8080/api/search', {
        params: { q: query },
      })
      .subscribe((res) => {
        // ⚠️ Handle backend casing properly
        const dishes = res?.dishes || res?.Dishes || [];
        const chefs = res?.chefs || res?.Chefs || [];

        let combinedResults = [...dishes];

        // 🔹 Add dishes where chef name matches query
        chefs.forEach((chef: any) => {
          dishes.forEach((dish: any) => {
            if (dish.chefName?.toLowerCase().includes(query.toLowerCase())) {
              combinedResults.push(dish);
            }
          });
        });

        this.searchResults = this.removeDuplicates(combinedResults);
        this.showDropdown = this.searchResults.length > 0;
      });
  }

  removeDuplicates(items: any[]): any[] {
    const map = new Map<string, any>();

    items.forEach((item) => {
      const key = `${item.itemName}-${item.chefName}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  }
  clearSearch() {
    this.searchText = '';
    this.searchResults = [];
    this.showDropdown = false;
  }

  openChef(chefId: string) {
    this.showDropdown = false;
    this.router.navigate(['/chef', chefId]);
  }

  /* ---------------- LOCATION ---------------- */

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this.http
            .get<any>(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            )
            .subscribe((data) => {
              const city = data?.address?.city || data?.address?.town || data?.address?.state;

              if (city) {
                this.selectedLocation = city;
                if (!this.availableLocations.includes(city)) {
                  this.availableLocations.unshift(city);
                }
              }
            });
        },
        () => (this.selectedLocation = ''),
      );
    }
  }

  onLocationChange(value: string) {
    if (value === 'Detect Again') {
      this.detectLocation();
    } else {
      this.selectedLocation = value;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
