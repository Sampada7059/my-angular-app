import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { FormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayProductComponent } from './display-product/display-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductCardsComponent } from './product-cards/product-cards.component';


@NgModule({ //decorator that contains declarations
  declarations: [
    AppComponent,
    CartComponent,
    CheckoutComponent,
    NavbarComponent,
    AddProductComponent,
    DisplayProductComponent,
    ProductCardsComponent
    
  ],
  imports: [ //allows module to access the functionality provided by other modules
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CartService, ProductService], //registers services at the module level for DI 
  bootstrap: [AppComponent] //It specifies a root component to load
})
export class AppModule { }
