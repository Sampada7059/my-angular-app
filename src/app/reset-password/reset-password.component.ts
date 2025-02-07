import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotResetPasswordService } from '../services/forgot-reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = '';
  isLoading: boolean = false; // For loading spinner

  constructor(
    private route: ActivatedRoute,
    private forgotPasswordService: ForgotResetPasswordService,
    private toastr: ToastrService, // Inject ToastrService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the token from query 
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onResetPassword(): void {
    // Validate form fields
    if (!this.password || !this.confirmPassword) {
      this.toastr.error('Please fill in all fields.', 'Error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match.', 'Error');
      return;
    }

    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters long.', 'Error');
      return;
    }

    this.isLoading = true; // Start loading spinner

    // Call the reset password endpoint
    this.forgotPasswordService.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.isLoading = false; // Stop loading spinner
        this.toastr.success('Password reset successful!', 'Success');
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (err) => {
        this.isLoading = false; // Stop loading spinner
        this.toastr.error(err.error?.message || 'Failed to reset password. Try again later.', 'Error');
      }
    });
  }
}
