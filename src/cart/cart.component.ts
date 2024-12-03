import { Component, OnInit } from '@angular/core';
import { CartService } from '../app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateItemTotal(item: any): void {
    this.cartService.updateCartItemQuantity(item.id, item.quantity);
    this.calculateTotal();
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}
