import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayProductComponent } from './display-product/display-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { DiscountComponent } from './discount/discount.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotResetPasswordService } from './services/forgot-reset-password.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({ //decorator that contains declarations
  declarations: [
    AppComponent,
    CartComponent,
    CheckoutComponent,
    AddProductComponent,
    DisplayProductComponent,
    ProductCardsComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    DiscountComponent,
    AddDiscountComponent,
   ForgotPasswordComponent,
   ResetPasswordComponent
    
  ],
  imports: [ //allows module to access the functionality provided by other modules
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton : true,
      timeOut : 3000
    })
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent] //It specifies a root component to load
})
export class AppModule { }
