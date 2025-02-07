import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegister(signupForm: any): void {
    // Check if the form is valid
    if (signupForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Call the AuthService to handle registration
    this.authService
      .signup(this.username, this.email, this.password, this.confirmPassword)
      .subscribe({
        next: () => {
          // Show success toast when registration is successful
          this.toastr.success('Registration successful!', 'Redirecting to login...');
          // Redirect to login page
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Show error toast if registration fails
          this.toastr.error(
            error.error?.title || 'Registration failed. Please try again.',
            'Error during registration'
          );
          // Optionally, set the error message to be displayed on the form
          this.errorMessage = error.error?.title || 'Registration failed. Please try again.';
        },
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Navigate back to the login page
  }
}
