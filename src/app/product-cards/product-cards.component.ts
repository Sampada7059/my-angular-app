import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  hoveredProduct: Product | null = null; // Track the hovered product

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => {
          product.quantity = 1; // Initialize quantity
        });
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
    if (product.quantity && product.quantity > 0) {
      this.cartService.addToCart(product, product.quantity);
      alert(`Added "${product.product_Name}" to your cart!`);
    } else {
      alert('Please select a valid quantity before adding to the cart.');
    }
  }
}
