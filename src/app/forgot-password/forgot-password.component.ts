import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotResetPasswordService } from '../services/forgot-reset-password.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage : string = '';

  constructor(
    private toastr : ToastrService,
    private forgotResetPasswordService: ForgotResetPasswordService,
    private router: Router
  ) {}

  onForgotPassword(): void {
    this.forgotResetPasswordService.generateToken(this.email).subscribe({
      next: (response: any) => {
        this.toastr.success('Your mail has been verified!');
        const token = response.token; // Get the token from the backend response
        this.router.navigate(['/reset-password'], { queryParams: { token } }); // Redirect to reset password page with token
      },
      error: (err) => {
        this.errorMessage = 'Failed to generate reset token. Try again later.';
        this.toastr.error('An error occurred. Please try again later.');
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Navigate back to the login page
  }
  
}
