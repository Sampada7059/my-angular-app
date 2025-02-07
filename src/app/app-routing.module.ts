import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { CartComponent } from 'src/cart/cart.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from 'src/checkout/checkout.component';
import { DiscountComponent } from './discount/discount.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'products', component: DisplayProductComponent, canActivate: [authGuard], data: {roles: ['Admin']} },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard], data: { roles: ['Admin']} },
  { path: 'productCards', component: ProductCardsComponent, canActivate: [authGuard], data: { roles: ['Admin', 'User']} },
  { path: 'cart', component: CartComponent, canActivate: [authGuard], data: { roles: ['Admin', 'User']} },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], data: { roles: ['Admin', 'User']} },
  { path: 'discount', component: DiscountComponent, canActivate: [authGuard], data: { roles: ['Admin']} },
  { path: 'add-discount', component: AddDiscountComponent, canActivate: [authGuard], data: { roles: ['Admin']} }, // Protect this route
  { path: 'edit-discount/:id', component: DiscountComponent, canActivate: [authGuard], data: { roles: ['Admin']} },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
