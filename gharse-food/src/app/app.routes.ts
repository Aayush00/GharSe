// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/login/login';
import { BecomeAChef } from './features/chef-module/become-a-chef/become-a-chef';
import { RegisterAChef } from './features/chef-module/register-a-chef/register-a-chef';

// Chef Dashboard & dummy child pages
import { ChefLayoutComponent } from './features/chef-module/chef-dashboard/chef-layout/chef-layout';
import { ChefDashboardComponent } from './features/chef-module/chef-dashboard/chef-dashboard';
import { ChefMenu } from './features/chef-module/chef-dashboard/chef-menu/chef-menu';
import { ChefOrders } from './features/chef-module/chef-dashboard/chef-orders/chef-orders';
import { ChefEarnings } from './features/chef-module/chef-dashboard/chef-earnings/chef-earnings';
import { ChefProfile } from './features/chef-module/chef-dashboard/chef-profile/chef-profile';
import { FoodList } from './features/food-list/food-list';
import { Cart } from './features/home/cart/cart';
import { FoodItemsPerChefAndName } from './features/home/food-items-per-chef-and-name/food-items-per-chef-and-name';
import { SearchingComponent } from './features/searching-component/searching-component';

export const routes: Routes = [
  // Public / Customer routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-to-us', component: BecomeAChef },
  { path: 'register-a-chef', component: RegisterAChef },
  {path: 'food', component: FoodList},
  {path: 'cart', component: Cart},
  {path: 'restaurant/:chefId',  component: FoodItemsPerChefAndName},
  {path: 'search', component: SearchingComponent},

  // Chef routes with layout
  {
    path: 'chef',
    component: ChefLayoutComponent,
    children: [
      { path: 'dashboard', component: ChefDashboardComponent },
      { path: 'menu', component: ChefMenu },
      { path: 'orders', component: ChefOrders },
      { path: 'earnings', component: ChefEarnings },
      { path: 'profile', component: ChefProfile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Wildcard route
  { path: '**', redirectTo: '' }
];
