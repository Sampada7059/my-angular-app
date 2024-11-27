import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  showPaymentOptions: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
