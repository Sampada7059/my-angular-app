import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  getCartCount() {
    return this.cartCountSubject.asObservable();
  }

  private updateCartCount() {
    const count = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(count);
  }

  addToCart(product: any, quantity: number): void {
    const existingItem = this.cartItems.find((item) => item.id === product.product_Id);
    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, 5);
    } else {
      this.cartItems.push({
        id: product.product_Id,
        name: product.product_Name,
        price: product.price,
        image: product.imagePath,
        quantity: Math.min(quantity, 5),
      });
    }
    this.cartItemsSubject.next(this.cartItems);
    this.updateCartCount();
  }
  
  

  updateCartItemQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, 5));
      this.cartItemsSubject.next([...this.cartItems]);
      this.updateCartCount();
    }
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount();
  }
}
