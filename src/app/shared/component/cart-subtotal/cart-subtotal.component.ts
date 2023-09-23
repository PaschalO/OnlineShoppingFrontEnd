import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-subtotal',
  templateUrl: './cart-subtotal.component.html',
  styleUrls: ['./cart-subtotal.component.css']
})
export class CartSubtotalComponent {
  orderSummary: string = 'Order summary';
  cartSubTotal: number = 69;
  orderTotal: number = 90;
  buttonCheckout: string = 'proceed to checkout';
}
