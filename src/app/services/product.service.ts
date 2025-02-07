import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
    product_Id: number;
    product_Name: string;
    product_Type: string;
    description: string;
    price: number;
    quantity: number;
    available: boolean;
    imagePath: string;
    discounted_Price?: number | null; 

}

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(id: number, product: FormData): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    uploadImage(image: File): Observable<{ imagePath: string }> {
        const formData = new FormData();
        formData.append('image', image);
        return this.http.post<{ imagePath: string }>(`${this.apiUrl}/upload`, formData);
    }
}
