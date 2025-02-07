import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7142/api'; // Adjust API URL

  constructor(private http: HttpClient) {}

  // Create an order - expects only userId (to initiate an order)
  createOrder(userId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/Order/create/${userId}`, {});
  }

  // Create order in backend
  placeOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders/place-order`, order);
  }

}


