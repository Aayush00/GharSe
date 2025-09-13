import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefMenu } from "./chef-menu/chef-menu";

@Component({
  selector: 'app-chef-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chef-dashboard.html',
  styleUrls: ['./chef-dashboard.css']
})
export class ChefDashboardComponent {
 router: any;
 goToMenu() {
    this.router.navigate(['/chef/menu']); // navigates to chef-menu component
  }}
