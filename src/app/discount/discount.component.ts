import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService, Discount } from 'src/app/services/discount.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  discounts: Discount[] = [];
  editingId: number | null = null;
  editingDiscount: Discount = this.initializeEmptyDiscount();

  constructor(private discountService: DiscountService, private router: Router) {}

  ngOnInit(): void {
    this.loadDiscounts();
  }

  /** Load discounts from the service */
  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe((data) => {
      this.discounts = data;
    });
  }

  /** Start editing a discount */
  startEditing(discount: Discount): void {
    this.editingId = discount.occasionId;
    this.editingDiscount = { ...discount }; // Clone the object to prevent mutating original
  }

  /** Save the discount being edited */
  saveDiscount(): void {
    if (!this.validateDiscount(this.editingDiscount)) {
      alert('All fields are required.');
      return;
    }
  
    // Ensure Occasion_Name and Product_Types are not empty
    if (!this.editingDiscount.occasionName.trim() || !this.editingDiscount.productType.trim()) {
      alert('Occasion Name and Product Types are required.');
      return;
    }
  
    // Prepare the payload
    const payload: Discount = {
      occasionId: this.editingId!,
      occasionName: this.editingDiscount.occasionName,
      discountPercentage: this.editingDiscount.discountPercentage,
      startDate: formatDate(this.editingDiscount.startDate, 'yyyy-MM-dd', 'en'),
      endDate: formatDate(this.editingDiscount.endDate, 'yyyy-MM-dd', 'en'),
      productType: this.editingDiscount.productType,
    };
  
  
    // Make the API call
    if (this.editingId) {
      this.discountService.updateDiscount(this.editingId, payload).subscribe({
        next: () => {
          alert('Discount updated successfully.');
          this.resetEditing();
          this.loadDiscounts();
        },
        error: (err) => this.handleError(err),
      });
    }
  }
  
  

  /** Delete a discount by ID */
  deleteDiscount(occasionId: number): void {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.discountService.deleteDiscount(occasionId).subscribe({
        next: () => {
          alert('Discount deleted successfully.');
          this.loadDiscounts();
        },
        error: (err) => {
          console.error('Error deleting discount:', err);
          alert('Failed to delete discount. Check console logs for details.');
        },
      });
    }
  }

  /** Navigate to the Add Discount page */
  navigateToAddDiscount(): void {
    this.router.navigate(['/add-discount']);
  }

  /** Reset editing state */
  resetEditing(): void {
    this.editingId = null;
    this.editingDiscount = this.initializeEmptyDiscount();
  }

  /** Initialize an empty discount object */
  initializeEmptyDiscount(): Discount {
    return {
      occasionId: 0,
      occasionName: '',
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      productType: '',
    };
  }

  /** Validate discount input */
  validateDiscount(discount: Discount): boolean {
    return (
      discount.occasionName.trim() !== '' &&
      discount.productType.trim() !== '' &&
      discount.discountPercentage > 0 &&
      discount.startDate.trim() !== '' &&
      discount.endDate.trim() !== ''
    );
  }

  /** Handle errors and display validation messages */
  private handleError(err: any): void {
    console.error('Error:', err);

    if (err.error && err.error.errors) {
      const validationErrors = err.error.errors as Record<string, string[]>;

      alert(
        `Validation Errors:\n${Object.entries(validationErrors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n')}`
      );
    } else {
      alert('An error occurred. Check console logs for details.');
    }
  }
}
