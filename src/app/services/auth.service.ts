import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ //decorator to show that the class can be injected
  providedIn: 'root', //this metadata specifies that this service visible throughout the application
})
export class AuthService {
  private apiUrl = 'https://localhost:7142/api/User'; // API URL to communicate with the end point

  // Subjects to track login state and user role
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  // Public observables
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setLoginState(token); // Initialize login state and role
    }
  }

  
  //Returns the current user role.
  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  
  //Login method to authenticate user and get a token.
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  //Signup method for creating a new user.
  signup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const payload = { username, email, password, confirmPassword };
    return this.http.post(`${this.apiUrl}/signup`, payload);
  }


//Logs out the user, clears the token and login state.
  logout(): void {
    localStorage.removeItem('authToken'); // Clear token
    this.isLoggedInSubject.next(false); // Emit logged-out status
    this.userRoleSubject.next(null); // Clear user role
  }

  
  //Handles the login process by saving the token and updating state.
  handleLogin(token: string): void {
    localStorage.setItem('authToken', token); // Save token in localStorage
    this.setLoginState(token);
     // Update login state and user role
    const role = this.getUserRole(); // Fetch the role
    if (role === 'User') {
      this.navigateTo('/productCards'); // Redirect to product cards for users
    } else if (role === 'Admin') {
      this.navigateTo('/products'); // Redirect to product list for admins
    }
  }

   //Retrieves authorization headers for authenticated requests.
  getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  //Checks the login status and updates state if necessary.
  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setLoginState(token); // Update state if token exists
    } else {
      this.isLoggedInSubject.next(false);
      this.userRoleSubject.next(null);
    }
  }

  
  //Decodes a JWT and extracts the user's role.
  private setLoginState(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token); // Decode the token

      const role = decodedToken['role']; // Extract role

      this.isLoggedInSubject.next(true); // Emit logged-in status
      this.userRoleSubject.next(role); // Emit user role
    } catch (error) {
      this.isLoggedInSubject.next(false);
      this.userRoleSubject.next(null);
    }
  }


  //Checks if the logged-in user has a specific role.
  hasRole(role: string): boolean {
    return this.userRoleSubject.value === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const currentRole = this.userRoleSubject.value;
    return roles.includes(currentRole || '');
  }

  hasRoleObservable(role: string): Observable<boolean> {
    return this.userRole$.pipe(map(userRole => userRole === role));
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
