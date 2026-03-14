import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Save tokens after login
  login(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Logout user
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');
  }

  // Check login state
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Get JWT
  getToken() {
    return localStorage.getItem('accessToken');
  }

  // Save user profile
  setUserProfile(profile: any) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  // Get user profile
  getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }
}