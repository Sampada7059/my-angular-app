import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotResetPasswordService {
  private apiUrl = 'https://localhost:7142/api/PasswordReset'; // Your API endpoint for Forgot and Reset Password

  constructor(private http: HttpClient) {}

  /**
   * Sends a password reset link to the provided email.
   * @param email User's email address to send the reset link
   * @returns Observable of the HTTP request
   */
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  generateToken(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  /**
   * Resets the user's password using the reset token and new password.
   * @param token The reset token received via email
   * @param newPassword The new password entered by the user
   * @returns Observable of the HTTP request
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    const payload = { token, newPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, payload);
  }
}
