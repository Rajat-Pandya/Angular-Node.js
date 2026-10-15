import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgClass, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  constructor(private router: Router) {}

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  isSuccess: boolean = false;
  isSubmitting: boolean = false;

  ToSuccess(form?: NgForm) {
    if (this.isSubmitting) {
      return;
    }

    if (form && form.invalid) {
      this.message = 'Please fill out all required fields correctly';
      this.isSuccess = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.isSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.isSuccess = true;
    this.message = 'Registered Successfully';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}

