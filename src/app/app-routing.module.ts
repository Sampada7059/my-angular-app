import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';


const routes: Routes = [
  { path: 'products', component: DisplayProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: AddProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'productCards', component: ProductCardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
