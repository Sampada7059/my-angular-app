import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.authService.handleLogin(response.token);
          this.router.navigate(['/productCards']); // Navigate to products after successful login
  
          // Show success toast when login is successful
          this.toastr.success('Login successful!', 'Welcome Back!');
        }
      },
      error: (error) => {
        // Show error toast if login fails
        this.toastr.error('Invalid username or password', 'Login Failed');
        this.errorMessage = 'Invalid username or password'; // You can still set the error message
      },
    });
  }
  

  // Method to navigate to the register page
  navigateToRegister(): void {
    this.router.navigate(['/signup']); // Navigate to the signup page
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']); // Navigate to forgot password page
  }
  
}
