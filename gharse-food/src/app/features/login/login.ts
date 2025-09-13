import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
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

  constructor(private router: Router) {}

  allowOnlyNumbers(event: KeyboardEvent) {
    const code = event.keyCode || event.which;
    if (code < 48 || code > 57) {
      event.preventDefault();
    }
  }

  restrictInvalid(event: any, type: 'mobile' | 'otp') {
    let value = event.target.value.replace(/\D/g, '');
    if (type === 'mobile') this.mobileNumber = value.slice(0, 10);
    else this.otp = value.slice(0, 6);
  }

  get maskedMobile(): string {
    return this.mobileNumber
      ? this.mobileNumber.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2')
      : '';
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

    this.otpSent = true;
    this.statusMessage = `✅ OTP sent to ${this.isSignUp ? 'email & mobile' : 'mobile number'}`;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  closeLogin() {
    this.showLogin = false;
    this.router.navigate(['/']);
  }

  verifyOtp() {
    if (this.otp.length === 6) {
      this.statusMessage = this.isSignUp
        ? '🎉 Account Created & Logged In! Redirecting...'
        : '🎉 Login Successful! Redirecting...';

      setTimeout(() => this.router.navigate(['/home']), 1500);
    } else {
      this.statusMessage = '❌ Invalid OTP, try again';
    }
  }
}
