// src/app/features/home/home.ts
import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { FoodList } from '../food-list/food-list';
import { Cart } from './cart/cart';
import { FooterComponent } from '../../shared/components/footer/footer';
import { HomeDisplayFood } from './home-display-food/home-display-food';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [NavbarComponent, RouterOutlet,HomeDisplayFood,FooterComponent]
})
export class HomeComponent {}
