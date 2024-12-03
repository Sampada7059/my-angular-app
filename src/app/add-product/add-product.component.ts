import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService, Product } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedImage: File | null = null;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      product_Id: [0],
      product_Name: [''],
      product_Type: [''],
      description: [''],
      price: [0],
      quantity: [0],
      available: [true],
    });
  }

  ngOnInit(): void {
    // Get product ID from route params (if editing)
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.productId) {
      this.loadProductData(this.productId);
    }
  }

  // Load product data for editing
  loadProductData(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      this.productForm.patchValue(product);  // Populate form with product data
    });
  }

  // Handle image selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  // Add or Update product
  addOrUpdateProduct(): void {
    const formData = new FormData();

    // Append product details from form
    Object.keys(this.productForm.value).forEach((key) => {
      formData.append(key, this.productForm.value[key]);
    });

    // Append the selected image (if any)
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.productId === null || this.productId === 0) {
      // Add new product
      this.productService.addProduct(formData).subscribe(() => {
        this.resetForm();
        // Optionally, navigate back to the product list
        this.router.navigate(['/products']);
      });
    } else {
      // Update existing product
      this.productService.updateProduct(this.productId, formData).subscribe(() => {
        this.resetForm();
        // Optionally, navigate back to the product list
        this.router.navigate(['/products']);
      });
    }
  }

  // Reset form after add/update
  resetForm(): void {
    this.productForm.reset({
      product_Id: 0,
      product_Name: '',
      product_Type: '',
      description: '',
      price: 0,
      quantity: 0,
      available: true,
    });
    this.selectedImage = null;
    this.productId = null;
  }
}
