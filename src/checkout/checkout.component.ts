import { Component, OnInit } from '@angular/core';
import { CartService} from '../app/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  showPaymentOptions: boolean = false;
  isLoggedIn: boolean = false; 


  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status; // Update the login status when it changes
    });
  }

  

  openPaymentOptions() {
    this.showPaymentOptions = true;
  }

  closePaymentOptions() {
    this.showPaymentOptions = false;
  }

  simulatePayment(method: string) {
    alert(`Payment successful through ${method}!`);
    this.cartService.clearCart(); // Clear the cart
    this.router.navigate(['/']); // Redirect to products page
  }
}
