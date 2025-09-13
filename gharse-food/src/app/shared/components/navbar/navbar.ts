import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuOpen = false;
  isChefPage = false;
  isRegisterChefPage = false; // new flag
  isChefDashboard = false; 

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isChefPage = event.url.includes('/new-to-us');
        this.isRegisterChefPage = event.url.includes('/register-a-chef');
        this.isChefDashboard = event.url.includes('/chef-dashboard'); // check URL
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
