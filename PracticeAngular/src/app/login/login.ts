import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  message: string = '';
  isSuccess: boolean = false;

  onLogin(): void {
    if (this.email && this.password) {
      this.errorMessage = '';
      this.message = '';

      // Call Node.js Backend Login API: POST /api/auth/login
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (res: any) => {
          // 1. Save JWT accessToken in localStorage
          this.authService.saveToken(res.accessToken);

          // 2. Save user info for display
          sessionStorage.setItem('loginUser', res.user?.username || this.email);

          // 3. Display success message
          this.isSuccess = true;
          this.message = res.message || 'Logged in successfully!';
          this.cdr.markForCheck();

          // 4. Wait 1.5 seconds before navigating to home page
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err: any) => {
          // Display backend error message (e.g., "Invalid credentials")
          this.isSuccess = false;
          this.errorMessage = err.error?.message || 'Login failed. Please check credentials.';
          this.cdr.markForCheck();
        },
      });
    }
  }

  ToHome(): void {
    this.onLogin();
  }
}
