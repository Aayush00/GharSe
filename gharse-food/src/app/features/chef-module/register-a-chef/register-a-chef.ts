import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chef-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register-a-chef.html',
  styleUrls: ['./register-a-chef.css']
})
export class RegisterAChef {
  step = 1;
  loading = false;

  constructor(private http: HttpClient) {}

  chefData: any = {
    name: '',
    email: '',
    mobileNumber: '',
    specialty: '',
    location: '',
    startTime: '',
    endTime: '',
    bankAccountDetails: '',
    profilePhoto: '' // preview url
  };

  selectedPhotoFile: File | null = null;
  errors: Record<string, string> = {};

  validateStep(step: number): boolean {
    this.errors = {};

    if (step === 1) {
      if (!this.chefData.name.trim()) this.errors['name'] = 'Name is required';
      if (!this.chefData.email.trim()) {
        this.errors['email'] = 'Email is required';
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.chefData.email)) {
        this.errors['email'] = 'Invalid email format';
      }
      if (!this.chefData.mobileNumber.trim()) {
        this.errors['mobileNumber'] = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(this.chefData.mobileNumber)) {
        this.errors['mobileNumber'] = 'Enter a valid 10-digit mobile number';
      }
    }

    if (step === 2) {
      if (!this.chefData.specialty.trim()) this.errors['specialty'] = 'Specialty is required';
      if (!this.chefData.location.trim()) this.errors['location'] = 'Location is required';
    }

    if (step === 3) {
      if (!this.chefData.startTime) this.errors['startTime'] = 'Start time is required';
      if (!this.chefData.endTime) this.errors['endTime'] = 'End time is required';
    }

    if (step === 4) {
      if (!this.chefData.bankAccountDetails.trim())
        this.errors['bankAccountDetails'] = 'Bank details are required';
    }

    return Object.keys(this.errors).length === 0;
  }

  nextStep() {
    // if (this.validateStep(this.step)) {
      this.step++;
    // }
  }

  prevStep() {
    this.step--;
  }

  jumpToStep(target: number) {
    if (target < this.step) {
      this.step = target;
    }
  }

  onProfilePhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedPhotoFile = input.files[0];
      this.chefData.profilePhoto = URL.createObjectURL(this.selectedPhotoFile); // preview only
    }
  }

  submitForm() {
  // if (!this.validateStep(this.step)) return;

  this.loading = true;

  // JSON payload
  const payload = {
    chefName: this.chefData.name,
    chefEmailId: this.chefData.email,
    chefMobileNumber: this.chefData.mobileNumber,
    specialty: this.chefData.specialty,
    location: this.chefData.location,
    startTime: this.chefData.startTime,
    endTime: this.chefData.endTime,
    bankAccountDetails: this.chefData.bankAccountDetails,
    profilePhoto: this.chefData.profilePhoto // preview URL
  };

  alert('Registration successful! (Simulated)');

//   this.http.post(`${environment.apiBaseUrl}/chef/chefRegistration`, payload, {
//   headers: { 'Content-Type': 'application/json' },
//   responseType: 'json' // optional, default is json
// }).subscribe({
//   next: (res: any) => {
//     this.loading = false;
//     alert(res.message); // show backend message
//     console.log(res);
//   },
//   error: (err) => {
//     this.loading = false;
//     alert('❌ Registration failed. Please try again.');
//     console.error(err);
//   }
// });
}
}
