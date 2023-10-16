import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart-service";
import {OrderSummaryService} from "../../services/order-summary.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart-subtotal',
  templateUrl: './cart-subtotal.component.html',
  styleUrls: ['./cart-subtotal.component.css']
})

export class CartSubtotalComponent implements OnInit{
  orderSummary: string = 'Order summary';
  //cartSubTotal!: Observable<number>;
  cartSubTotal!: number;
  orderTotal: number = 90;
  buttonCheckout: string = 'proceed to checkout';

  constructor(private orderSummaryService: OrderSummaryService, private cartService: CartService) {}

  ngOnInit() {
    this.showOrderSummary();
  }

  showOrderSummary() {
    this.cartSubTotal = this.cartService.calculateGrandTotalPrice();
    //this.cartSubTotal = this.cartService.calculateTP();
  }
}
