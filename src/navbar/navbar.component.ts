import { Component } from '@angular/core';
import { CartService } from '../app/services/cart.service';
import { AddProductComponent } from 'src/app/add-product/add-product.component';
import { DisplayProductComponent } from 'src/app/display-product/display-product.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0); // Total quantity of items
    });
  }
}
