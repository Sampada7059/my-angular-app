// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Product } from './product.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductDemandService {
//   private metricsApiUrl = environment.metricsApiUrl;

//   constructor(private http: HttpClient) {}
  
//   getDynamicPrice(productId: number, isAddToCart: boolean, isShowDetails: boolean): Observable<any> {
//     return this.http.get(`${this.metricsApiUrl}/dynamic-price/${productId}`, {
//       params: {
//         isAddToCart: isAddToCart.toString(),
//         isShowDetails: isShowDetails.toString(),
//       },
//     });
//   }
  
// }
