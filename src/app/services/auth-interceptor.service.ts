import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'; // Necessary imports for intercepting HTTP requests
import { Observable } from 'rxjs'; // Observable type for handling asynchronous operations

@Injectable({
  providedIn: 'root', // Marks this service as injectable and makes it available application-wide
})
export class AuthInterceptorService implements HttpInterceptor { // Implements the HttpInterceptor interface
  constructor() {}

  /**
   * Intercepts HTTP requests to attach an Authorization token.
   * This method is automatically called for every outgoing HTTP request.
   *
   * @param request - The outgoing HTTP request.
   * @param next - The next handler in the HTTP pipeline.
   * @returns Observable<HttpEvent<any>> - The modified or original request passed to the next handler.
   */
  intercept( //method that automatically called for every outgoing HTTP request
    request: HttpRequest<any>, // Represents the HTTP request being sent
    next: HttpHandler // Passes the request along the pipeline
  ): Observable<HttpEvent<any>> { //returns an Observable which represents the modofied request and its subsequent events
    // Get the token from localStorage
    const token = localStorage.getItem('authToken'); // Retrieves the authentication token stored in localStorage

    // Clone the request and add the Authorization header
    if (token) { // Checks if the token exists
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Appends the token to the request's headers
        },
      });
    }

    return next.handle(request); // Passes the modified request to the next handler in the pipeline
  }
}
