import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICart} from "../../../../products/product-spec";
import {CartService} from "../../../../../../shared/services/cart-service";
import {CheckoutService} from "../../../../../../shared/services/checkout.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})

export class ReviewListComponent implements OnInit, OnDestroy{

  /* global variables */
  shippingFormCustomer: Record<string, string> | undefined;
  billingFormCustomer: Record<string, string> | undefined;
  productItems: ICart[] | null = [];
  tax: number = 0.13;
  shipping: number = 0;
  totalPrice: number = 0;

  /* subscriptions */
  private shippingFormSubscription$: Subscription | undefined;
  private billingFormSubscriptions$: Subscription | undefined;
  constructor(private cartService: CartService, public checkoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {
    this.productItems = this.viewCartItems();
    this.shippingFormSubscription$ = this.showShippingCustomerDetails()
        .valueChanges.subscribe((data) => this.shippingFormCustomer = data);

    this.billingFormSubscriptions$ = this.showBillingCustomerDetails()
        .valueChanges.subscribe(data => this.billingFormCustomer = data);

    this.totalPrice = this.showTotalPrice();
  }

  ngOnDestroy(): void {
    this.shippingFormSubscription$?.unsubscribe();
    this.billingFormSubscriptions$?.unsubscribe();
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

  showBillingCustomerDetails(): FormGroup {
    return this.checkoutService.secondFormData;
  }

  onSubmitForm() {
    // since we do not have a backend, just navigate to the confirmation page
    //return this.checkoutService.submitCheckOutForm();
    this.navigateToConfirmationPage();
  }

  navigateToConfirmationPage() {
    this.router.navigate(['/confirmation-page']);
    this.cartService.clearCart();
  }
}
