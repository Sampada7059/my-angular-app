import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from 'src/app/services/product.service';
interface ProductResponse {
  products: Product[]; // The API response has a 'products' array
}

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css'],
})
export class DisplayProductComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product = {
    product_Id: 0,
    product_Name: '',
    product_Type: '',
    description: '',
    price: 0,
    quantity: 0,
    available: false,
    imagePath: '', // Added missing imagePath property
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // loadProducts(): void {
  //   this.productService.getProducts().subscribe((data) => {
  //     if (data && Array.isArray(data.products)) {
  //       this.products = data.products;
  //     } else {
  //       console.error('No valid products array found in response:', data);
  //     }
  //   });
  // }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Fetched Products:', data);  // Check if you get the array directly here
        this.products = data;  // Assign the directly fetched products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully.');
        this.loadProducts();
      });
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product }; // Create a copy to avoid modifying the original object
  }

  saveProduct(): void {
    if (this.editingProduct) {
      // Convert Product to FormData
      const formData = new FormData();
      formData.append('product_Id', this.editingProduct.product_Id.toString());
      formData.append('product_Name', this.editingProduct.product_Name);
      formData.append('product_Type', this.editingProduct.product_Type);
      formData.append('description', this.editingProduct.description);
      formData.append('price', this.editingProduct.price.toString());
      formData.append('quantity', this.editingProduct.quantity.toString());
      formData.append('available', this.editingProduct.available.toString());

      // Optional: Check if imagePath exists and append it
      if (this.editingProduct.imagePath) {
        formData.append('imagePath', this.editingProduct.imagePath);
      }

      // Call the update method with FormData
      this.productService.updateProduct(this.editingProduct.product_Id, formData).subscribe(() => {
        alert('Product updated successfully.');
        this.loadProducts(); // Refresh the product list
        this.editingProduct = { 
          product_Id: 0,
          product_Name: '',
          product_Type: '',
          description: '',
          price: 0,
          quantity: 0,
          available: false,
          imagePath: '', // Reset the form after save
        }; // Clear editing mode
      });
    }
  }

  cancelEditing(): void {
    this.editingProduct = { 
      product_Id: 0,
      product_Name: '',
      product_Type: '',
      description: '',
      price: 0,
      quantity: 0,
      available: false,
      imagePath: '', // Reset to initial empty state
    }; // Clear editing mode
  }
}
