// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

// 🔥 Initialize Firebase BEFORE Angular bootstraps
initializeApp(environment.firebase);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));