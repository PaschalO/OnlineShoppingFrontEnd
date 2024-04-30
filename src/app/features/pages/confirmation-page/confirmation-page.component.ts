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

		console.log(this.customerInfo$);
		console.log(this.customerData, "line 31");
	}

	ngOnDestroy(): void {
		this.customerInfo$?.unsubscribe();
	}

	navigateToHomePage() {
		this.router.navigate([""]);
		this.cartService.clearCart();
	}

	showCustomerData() {
		return this.checkOutService.secondFormData;
	}

	showTotalAmount() {
		return this.cartService.calculateGrandTotalPrice();
	}
}
