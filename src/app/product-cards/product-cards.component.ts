import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/cart.service';
import { ProductService, Product } from 'src/product.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  
  products: Product[] = []; // All products from the API
  searchTerm: string = ''; // Bind this to the search input field

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products on component initialization
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => {
          product.quantity = 1; // Set default quantity to 1 for each product
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        console.log('Products successfully loaded.');
      }
    });
  }

  // Method to filter products based on the search term
  filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) {
      return this.products; // Return all products if the search term is empty
    }
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.product_Name.toLowerCase().includes(lowerCaseSearch)
    );
  }

  // Method to decrease the quantity
  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Method to increase the quantity
  increaseQuantity(product: Product): void {
    if (product.quantity < 5) {
      product.quantity++;
    }
  }

  // Add a product to the cart
  addToCart(product: Product): void {
    if (product.quantity && product.quantity > 0) {
      this.cartService.addToCart(product, product.quantity); // Pass selected quantity
      alert(`Added ${product.quantity} of "${product.product_Name}" to your cart!`);
    } else {
      alert('Please select a valid quantity before adding to the cart.');
    }
  }
}
