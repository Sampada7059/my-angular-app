import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  order: any = {
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
  };

  cartItems: any[] = []; // Array to store cart items
  totalAmount: number = 0; // Total order amount

  constructor() {}

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails() {
    // Fetch cart details (replace this with API call if needed)
    this.cartItems = [
      { productName: 'Product 1', quantity: 2, unitPrice: 500 },
      { productName: 'Product 2', quantity: 1, unitPrice: 300 },
    ];
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  placeOrder() {
    if (!this.order.fullName || !this.order.address || !this.order.city || !this.order.zipCode || !this.order.paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Order placed:', this.order);
    alert('Order successfully placed!');
  }
}
