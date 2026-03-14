import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Update the path below if your service is located elsewhere
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  mobileNumber: string = '';
  fullName: string = '';
  email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  isSignUp: boolean = false;
  statusMessage: string = '';
  showLogin: boolean = true;

  constructor(
    private router: Router,
    private firebaseAuth: FirebaseAuthService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  allowOnlyNumbers(event: KeyboardEvent) {
    const code = event.keyCode || event.which;
    if (code < 48 || code > 57) {
      event.preventDefault();
    }
  }

  get maskedMobile(): string {
    return this.mobileNumber ? this.mobileNumber.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2') : '';
  }

  editNumber() {
    this.otpSent = false;
    this.otp = '';
    this.statusMessage = '';
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.statusMessage = '';
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  sendOtp() {
    if (this.mobileNumber.length !== 10) {
      this.statusMessage = '⚠️ Please enter a valid 10-digit number';
      return;
    }

    if (this.isSignUp) {
      if (!this.fullName.trim()) {
        this.statusMessage = '⚠️ Please enter your name';
        return;
      }
      if (!this.validateEmail(this.email)) {
        this.statusMessage = '⚠️ Please enter a valid email';
        return;
      }
    }

    const phoneWithCode = '+91' + this.mobileNumber;

    this.firebaseAuth
      .sendOtp(phoneWithCode)
      .then(() => {
        this.otpSent = true;
        this.statusMessage = `✅ OTP sent to ${this.maskedMobile}`;
      })
      .catch((error) => {
        console.error(error);
        this.statusMessage = '❌ Failed to send OTP. Try again.';
      });
  }

  verifyOtp() {
    if (this.otp.length !== 6) {
      this.statusMessage = '❌ Please enter valid 6-digit OTP';
      return;
    }

    this.firebaseAuth
      .verifyOtp(this.otp)
      .then((userCredential: { user: { getIdToken: () => any; }; }) => userCredential.user.getIdToken())
      .then((token: any) => {
        console.log('Firebase ID Token:', token);

        // 🔥 Send Firebase token to backend
        return this.http
          .post(
            'http://localhost:8080/api/auth/firebase-login',
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .toPromise();
      })
      .then((res: any) => {
        // 🔐 Store your JWT
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        this.statusMessage = this.isSignUp
          ? '🎉 Account Created & Logged In!'
          : '🎉 Login Successful!';

        setTimeout(() => this.router.navigate(['/home']), 800);
      })
      .catch((error: any) => {
        console.error(error);
        this.statusMessage = '❌ Invalid OTP. Try again.';
      });
  }

  closeLogin() {
    this.showLogin = false;
    this.router.navigate(['/']);
  }
}
