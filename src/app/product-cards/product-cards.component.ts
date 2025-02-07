import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService, Product } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  hoveredProduct: Product | null = null; // Track the hovered product
  cartCount: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private http: HttpClient // Add this
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log("Fetched Products:", data); // Debugging the API response
  
        // Check if the response contains a $values array or is already an array
        if (data && data.$values && Array.isArray(data.$values)) {
          this.products = data.$values.map((product: any) => ({
            ...product,
            quantity: 1 // Initialize quantity
          }));
        } else if (Array.isArray(data)) {
          this.products = data.map((product: any) => ({
            ...product,
            quantity: 1
          }));
        } else {
          console.error('Unexpected response format:', data);
          this.products = []; // Ensure it's an array to avoid errors
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) {
      return this.products;
    }
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.product_Name.toLowerCase().includes(lowerCaseSearch)
    );
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  increaseQuantity(product: Product): void {
    if (product.quantity < 5) {
      product.quantity++;
    }
  }

  addToCart(product: Product): void {
    if (product.quantity > 0) {
      this.cartService.addToCart(product, product.quantity);
    }
  }
  
}
