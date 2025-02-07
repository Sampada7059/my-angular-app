// In navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private userRoleSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.cartService.cartCount$.subscribe(cartCount => {
    //   this.cartCount = cartCount;
    // });

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userRoleSubscription = this.authService.userRole$.subscribe((role) => {
          this.isAdmin = role === 'Admin';
        });
      } else {
        this.isAdmin = false;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userRoleSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }
  // onCartIconClick() {
  //   this.cartService.loadCart();  // Load cart details
  // }
}
