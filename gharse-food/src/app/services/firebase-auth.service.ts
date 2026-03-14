import { Injectable } from '@angular/core';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {

  private auth = getAuth();
  confirmationResult: any;
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  initRecaptcha() {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        'recaptcha-container',
        { size: 'invisible' }
      );
    }
    return this.recaptchaVerifier;
  }

  sendOtp(phoneNumber: string) {
    const appVerifier = this.initRecaptcha();
    return signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
      .then(result => this.confirmationResult = result);
  }

  verifyOtp(code: string) {
    return this.confirmationResult.confirm(code);
  }
}