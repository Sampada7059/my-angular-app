import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Discount } from '../Models/discount.model';

export interface Discount {
  occasionId: number;
  occasionName: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  productType: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = 'https://localhost:7142/api/Discount';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // GET all occasion discounts
  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.apiUrl);
  }

  // GET a single occasion discount by ID
  getDiscountById(id: number): Observable<Discount> {
    return this.http.get<Discount>(`${this.apiUrl}/${id}`);
  }

  // POST a new occasion discount
  addDiscount(occasionDiscount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.apiUrl, occasionDiscount);
  }

  // PUT (update) an existing occasion discount
  updateDiscount(id: number, occasionDiscount: Discount): Observable<Discount> {
    return this.http.put<Discount>(`${this.apiUrl}/${id}`, occasionDiscount);
  }

  // DELETE an occasion discount by ID
  deleteDiscount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
