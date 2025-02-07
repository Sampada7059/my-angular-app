// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/Models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCartValue: number = 0;
  isCartEmpty: boolean = true;
  userId: string | null= null; 

  constructor(
    private cartService: CartService, private authService: AuthService, private router: Router, 
     private orderService : OrderService, private toastr : ToastrService
  ) {}
 
  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Ensure userId is assigned first
    
    if (this.userId) {
      this.loadCartItems();
  
      this.cartService.getTotalCartValue(this.userId).subscribe(
        (total) => {
          this.totalCartValue = total;
        },
        (error) => {
          console.error('Error fetching total cart value:', error);
        }
      );
    }
  
    // Subscribe to cart updates so UI updates dynamically
    this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.totalCartValue = this.calculateTotal(this.cartItems); // Pass the items to the function
    });
    
  }
  

  loadCartItems(): void {
    this.userId = this.authService.getUserId();
    if(this.userId)
    this.cartService.getCartItems(this.userId).subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  removeItem(productId: number): void {
    if (this.userId) {
      this.cartService.removeFromCart(this.userId, productId); // Use the correct method to remove from cart
    } else {
      console.error('User not logged in. Cannot remove item.');
    }
  }

  clearCart(): void {
    if (this.userId) {
      this.cartService.clearCart(this.userId);
    } else {
      console.error('User is not logged in, cannot clear cart');
    }
  }

  proceedToCheckout() {
    console.log('Stored Role:', this.authService.getUserRole());
    console.log('Checkout button clicked');  // Debugging step
    this.router.navigate(['/checkout']);  // Navigate to the checkout page
    console.log('Stored Role:', this.authService.getUserRole());
  }
  
}

