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
  filteredDiscounts: Discount[] = [];
  editingId: number | null = null;
  editingDiscount: Discount = this.initializeEmptyDiscount();
  filterStatus: string = 'all'; // Default filter status
  selectedStatus: string = 'Discounts Status'; // Default dropdown button label

  constructor(private discountService: DiscountService, private router: Router) {}

  ngOnInit(): void {
    this.loadDiscounts();
  }

  /** Load discounts from the service */
  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe((data) => {
      this.discounts = data;
      this.applyFilter(); // Apply initial filter based on selectedStatus
    });
  }

  /** Update the filter and selectedStatus when a dropdown option is clicked */
  updateFilter(status: string): void {
    this.selectedStatus = status; // Update the label of the dropdown button
    this.filterStatus = status.toLowerCase(); // Update the filter status
    this.applyFilter(); // Apply the new filter
  }

  /** Apply filter based on the selected status */
  applyFilter(): void {
    const currentDate = new Date();

    if (this.filterStatus === 'all') {
      // If "All" is selected, show all discounts
      this.filteredDiscounts = [...this.discounts];
    } else {
      this.filteredDiscounts = this.discounts.filter((discount) => {
        const startDate = new Date(discount.startDate);
        const endDate = new Date(discount.endDate);

        if (this.filterStatus === 'active') {
          return currentDate >= startDate && currentDate <= endDate;
        } else if (this.filterStatus === 'expired') {
          return currentDate > endDate;
        } else if (this.filterStatus === 'upcoming') {
          return currentDate < startDate;
        }
        return true; // Default case
      });
    }
  }

  /** Start editing a discount */
  startEditing(discount: Discount): void {
    this.editingId = discount.occasionId;
    this.editingDiscount = { ...discount };
  }

  /** Save the discount being edited */
  saveDiscount(): void {
    // Ensure we are only sending modified fields
    const payload: Discount = {
      occasionId: this.editingId!,
      occasionName: this.editingDiscount.occasionName.trim() || this.editingDiscount.occasionName, // Keep original value if not modified
      discountPercentage: this.editingDiscount.discountPercentage,
      startDate: this.formatDateForApi(this.editingDiscount.startDate), // Format date properly
      endDate: this.formatDateForApi(this.editingDiscount.endDate), // Format date properly
      productType: this.editingDiscount.productType.trim() || this.editingDiscount.productType, // Keep original value if not modified
    };

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

  formatDateForApi(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString();  // Format to ISO 8601 format for API
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
          alert('Failed to delete discount.');
        },
      });
    }
  }

  navigateToAddDiscount(): void {
    this.router.navigate(['/add-discount']);
  }

  resetEditing(): void {
    this.editingId = null;
    this.editingDiscount = this.initializeEmptyDiscount();
  }

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

  validateDiscount(discount: Discount): boolean {
    return (
      discount.occasionName.trim() !== '' &&
      discount.productType.trim() !== '' &&
      discount.discountPercentage > 0 &&
      discount.startDate.trim() !== '' &&
      discount.endDate.trim() !== ''
    );
  }

  private handleError(err: any): void {
    console.error('Error:', err);
    alert('An error occurred. Check console logs for details.');
  }
}
