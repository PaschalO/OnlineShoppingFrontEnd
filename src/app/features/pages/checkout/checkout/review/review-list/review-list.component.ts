import {Component, OnInit} from '@angular/core';
import {ICart} from "../../../../products/product-spec";
import {CartService} from "../../../../../../shared/services/cart-service";
import {CheckoutService} from "../../../../../../shared/services/checkout.service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})

export class ReviewListComponent implements OnInit{

  productItems: ICart[] | null = [];
  tax: number = 0.13;
  shipping: number = 0;
  constructor(private cartService: CartService, public checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.productItems = this.viewCartItems();
  }

  viewCartItems(): ICart[] | null {
    return this.cartService.displayItemsInCart();
  }

  showTotalPrice(): number {
    return this.cartService.calculateGrandTotalPrice();
  }

  showShippingCustomerDetails() {
    return this.checkoutService.firstFormData;
  }

  showBillingCustomerDetails() {
    return this.checkoutService.secondFormData;
  }

  onSubmitForm() {
    return this.checkoutService.submitCheckOutForm();
  }
}
