import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-become-a-chef',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './become-a-chef.html',
  styleUrl: './become-a-chef.css'
})
export class BecomeAChef {
isChefPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isChefPage = event.url.includes('/register-a-chef');
      }
    });
  }
}
