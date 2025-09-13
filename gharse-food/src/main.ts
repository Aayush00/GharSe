// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
// This file bootstraps the Angular application, providing the main AppComponent and the defined routes.
// It uses the `bootstrapApplication` function to start the application with the specified component and routing