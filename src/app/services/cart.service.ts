import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from '../Models/cart-item.model';
import { AuthService } from './auth.service';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://localhost:7142';  // Replace with your actual API URL

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]); // To track cart items
  cartItems$ = this.cartItemsSubject.asObservable();  // Observable to subscribe to

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

//   private totalCartValueSubject = new BehaviorSubject<number>(0);
// totalCartValue$ = this.totalCartValueSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  loadCart(userId: string): void {
    this.getCartItems(userId).subscribe((items) => {
      this.cartItemsSubject.next(items);
      this.updateCartCount(items);
      this.updateTotalCartValue(items); // ✅ Update total cart value
    });
  }

  // ✅ Utility function to update cart count
  private updateCartCount(cartItems: CartItem[]): void {
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCountSubject.next(totalCount);
  }
// Function to update total cart value
private updateTotalCartValue(cartItems: CartItem[]): void {
  console.log("Updating Total Cart Value with items:", cartItems); // ✅ Check incoming items
  const totalValue = cartItems.reduce((total, item) => {
    console.log(`Item: ${item.productName}, Price: ${item.unitPrice}, Qty: ${item.quantity}`); // ✅ Debug each item
    return total + (item.unitPrice * item.quantity);
  }, 0);
  console.log("Total Cart Value Calculated:", totalValue); // ✅ Check calculated value
  // this.totalCartValueSubject.next(totalValue);
}


  addToCart(product: Product, quantity: number): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('User ID is not available. Cannot add to cart.');
      return;
    }
    // console.log(product);
    let imagePath = product.imagePath;

  // Check if the image path is relative (starts with "/Images")
  if (imagePath.startsWith('/Images')) {
    // Prepend the full URL from backend
    imagePath = `https://localhost:7142${imagePath}`;
  }
  const unitPrice = product.discounted_Price ?? product.price; // Always get a valid number
  const totalPrice = (quantity > 0 ? quantity : 1) * unitPrice; // Ensure total price is always valid

  const cartItemDto = {
    userId: userId,
    productId: product.product_Id,
    productName: product.product_Name,
    imagePath: imagePath,
    quantity: quantity > 0 ? quantity : 1,
    unitPrice,
    totalPrice
  };
  
  console.log("Cart Item DTO:", cartItemDto); // Check if `unitPrice` is correct

    const currentCart = this.cartItemsSubject.getValue();
    const existingItemIndex = currentCart.findIndex((item: any) => item.productId === product.product_Id);
  
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({ ...cartItemDto, quantity });
    }

    // Update the UI cart and make API request to add to the backend
    this.cartItemsSubject.next(currentCart);
    this.updateCartCount(currentCart);  // Update cart count
  
    this.http.post(`${this.apiUrl}/api/Cart/add`, cartItemDto)
      .pipe(
        catchError((error) => { console.error('Error syncing addToCart:', error);
          return of(null);
        })
      ).subscribe();
  }

  // ✅ Clear the cart
  clearCart(userId: string): void {
    if (!userId) {
      console.error('Invalid userId:', userId);
      return;
    }

    this.http.delete(`${this.apiUrl}/api/cart/clear/${userId}`).subscribe({
      next: () => {
        this.cartItemsSubject.next([]);  // Clear the cart in UI instantly
        this.cartCountSubject.next(0);   // Reset cart count to 0
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      },
      complete: () => {
        console.log('Cart successfully cleared');
      },
    });
  }
  
  removeFromCart(userId: string, productId: number): void {
    if (!userId || !productId) {
      console.error('Invalid userId or productId');
      return;
    }

    this.http.delete(`${this.apiUrl}/api/cart/remove/${userId}/${productId}`).subscribe({
      next: () => {
        const updatedCartItems = this.cartItemsSubject.getValue().filter((item) => item.productId !== productId);
        this.cartItemsSubject.next(updatedCartItems);
        this.updateCartCount(updatedCartItems);  // Update cart count after removal
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      },
      complete: () => {
        console.log('Item successfully removed from cart');
      },
    });
  }

  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/api/Cart/get/${userId}`);
  }
  
  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/Products/${productId}`);
  }

  getTotalCartValue(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/Cart/total/${userId}`);
  }
  
  
}
