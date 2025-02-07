import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  isLoggedIn: boolean = false; // This tracks the login status
  isAdmin: boolean = false; // This tracks if the user is an admin
  private userRoleSubscription!: Subscription; // Definite assignment

  constructor(
    private cartService: CartService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0); // Total quantity of items
    });

    // Subscribe to the 'isLoggedIn$' observable to track login status
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; // Update the login status when it changes
  
      if (this.isLoggedIn) {
        // Subscribe to the 'userRole$' observable to track user role
        this.userRoleSubscription = this.authService.userRole$.subscribe((role) => {
          this.isAdmin = role === 'Admin'; // Set isAdmin based on role
        });
      } else {
        this.isAdmin = false; // Reset isAdmin when not logged in
      }
    });
  }

  onLogout(): void {
    this.authService.logout(); // Trigger logout in AuthService
    this.router.navigate(['/login']); // Navigate to login page
    this.isLoggedIn = false; // Update login status
    this.isAdmin = false; // Reset admin status
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe(); // Unsubscribe from the role subscription
    }
  }
}
