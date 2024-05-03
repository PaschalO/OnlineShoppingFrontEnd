import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CheckoutService } from "../../../shared/services/checkout.service";
import { Subscription } from "rxjs";
import { CartService } from "../../../shared/services/cart-service";

@Component({
	selector: "app-confirmation-page",
	templateUrl: "./confirmation-page.component.html",
	styleUrls: ["./confirmation-page.component.css"]
})

/**
 * Confirmation page component logic. Handles the interactions on the
 * confirmation page after purchasing items from the shopping cart.
 *
 * @class ConfirmationPageComponent
 * @implements {OnInit}
 */
export class ConfirmationPageComponent implements OnInit, OnDestroy {
	buttonName: string = "Back to the home page";
	customerData: Record<string, string> | undefined;
	totalAmount: number = 0;
	tax: number = 0.13;
	shipping: number = 0;

	public customerInfo$: Subscription | undefined;

	constructor(
		private router: Router,
		private checkOutService: CheckoutService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.totalAmount = this.showTotalAmount();
		console.log(this.customerData, "line 26");

		this.customerInfo$ = this.showCustomerData().valueChanges.subscribe(
			(data) => (this.customerData = data)
		);
	}

	ngOnDestroy(): void {
		this.customerInfo$?.unsubscribe();
	}

	/**
	 * Navigates to the home page and clears the cart.
	 *
	 * @return {void}
	 */
	navigateToHomePage() {
		this.router.navigate([""]);
		this.cartService.clearCart();
	}

	/**
	 * Retrieves the customer data from the checkOutService.
	 *
	 * @returns {any} The customer data.
	 */
	showCustomerData() {
		return this.checkOutService.secondFormData;
	}

	/**
	 * Retrieves the total amount from the cart.
	 * @returns {number} The total amount.
	 */
	showTotalAmount() {
		return this.cartService.calculateGrandTotalPrice();
	}
}
