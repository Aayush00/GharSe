// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  NavbarComponent } from './shared/components/navbar/navbar';
import {  FooterComponent } from './shared/components/footer/footer';
import { FloatingCart } from "./features/floating-cart/floating-cart";
// import { Login } from './features/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FloatingCart],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
