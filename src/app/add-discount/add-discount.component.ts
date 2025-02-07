import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/services/discount.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css'],
})
export class AddDiscountComponent implements OnInit {
  discountForm: FormGroup;
  discountId: number | null = null;  // For editing an existing discount

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.discountForm = this.fb.group({
      occasion_Name: ['', Validators.required],      // Ensure this name matches the API
      discount_Percentage: [null, Validators.required],
      start_Date: ['', Validators.required],
      end_Date: ['', Validators.required],
      product_Types: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the discount ID from the route params (if editing)
    this.discountId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.discountId) {
      this.loadDiscountData(this.discountId);
    }
  }

  // Load discount data for editing
  // loadDiscountData(discountId: number): void {
  //   this.discountService.getDiscount(discountId).subscribe((discount) => {
  //     this.discountForm.patchValue({
  //       occasion_Name: discount.occasionName,
  //       discount_Percentage: discount.discountPercentage,
  //       start_Date: discount.startDate,
  //       end_Date: discount.endDate,
  //       product_Type: discount.productType,
  //     });
  //   });
  // }
  
  loadDiscountData(id: number): void {
    this.discountService.getDiscountById(id)
      .pipe(
        catchError((error) => {
          console.error('Error fetching discount:', error);
          return of(null); // Return a default value or handle appropriately
        })
      )
      .subscribe({
        next: (discount) => {
          if (discount) {
            this.discountForm.patchValue(discount); // Populate the form
          }
        },
        error: (error) => {
          console.error('Error during subscription:', error);
        },
      });
  }
  
  // Add or Update discount
  addDiscount(): void {
    const discountData = {
      ...this.discountForm.value,
      product_Types: [this.discountForm.value.product_Types], // Wrap in an array
    };
  
    this.discountService.addDiscount(discountData).subscribe({
      next: () => {
        this.resetForm();
        this.router.navigate(['/discounts']);
      },
      error: (err) => {
        console.error('Error adding discount:', err);
        console.error('Validation errors:', err.error.errors); // Log validation errors
      },
    });
  }
  


  // Reset form after add/update
  resetForm(): void {
    this.discountForm.reset({
      occasion_Name: '',
      discount_Percentage: null,
      start_Date: '',
      end_Date: '',
      product_Type: '',
    });
    this.discountId = null;
  }
}
