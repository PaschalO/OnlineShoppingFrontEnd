import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { CartService } from "../../../../shared/services/cart-service";
import { CheckoutService } from "../../../../shared/services/checkout.service";
import { map, Observable, startWith, Subscription, tap } from "rxjs";
import { ShippingFormInterface } from "../../../../interface/shipping-form-interface";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.component.html",
	styleUrls: ["./checkout.component.css"],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true }
		}
	]
})
export class CheckoutComponent implements OnInit, OnDestroy {
	firstFormGroup!: FormGroup;
	secondFormGroup!: FormGroup;
	totalPriceOfCart: number = 0;
	totalItemsInCart: number = 0;
	shippingFormCustomer: Partial<ShippingFormInterface> | undefined;
	checkOutFormSelection!: Observable<boolean>;
	showShippingSubscription: Subscription | undefined;

	constructor(
		private checkoutService: CheckoutService,
		private cartService: CartService
	) {}

	ngOnInit() {
		this.firstFormGroup = this.checkoutService.firstFormData;
		this.secondFormGroup = this.checkoutService.secondFormData;
		this.totalPriceOfCart = this.showTotalPrice();
		this.totalItemsInCart = this.showTotalItemQuantity();
		this.checkOutFormSelection = this.showCheckOutFormSelection();
		this.showShippingSubscription =
			this.showShippingFormCustomerDetails().subscribe(
				(data) => (this.shippingFormCustomer = data)
			);
	}

	ngOnDestroy() {
		this.showShippingSubscription?.unsubscribe();
	}

	onAddressSelectionChange(event: any) {
		const shippingAddress = this.firstFormGroup.value;
		const billingAddress = this.secondFormGroup;
		const selectedRadioButton = event.value;
		if (selectedRadioButton === "1") {
			billingAddress.patchValue(shippingAddress);
		} else if (selectedRadioButton === "2") {
			billingAddress.patchValue({
				firstName: "",
				lastName: "",
				email: "",
				country: "",
				address: "",
				unit: "",
				city: "",
				province: "",
				postalCode: "",
				phoneNumber: "",
				billingAddress: "2"
			});
		}
	}

	showTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	showTotalItemQuantity() {
		return this.cartService.calculateTotalQuantity();
	}

	showCheckOutFormSelection() {
		return this.secondFormGroup.controls[
			"billingAddress"
		].valueChanges.pipe(
			startWith(this.firstFormGroup.get("billingAddress")?.value),
			map((value) => value === "1")
		);
	}
	showShippingFormCustomerDetails(): Observable<
		Partial<ShippingFormInterface>
	> {
		return this.secondFormGroup.valueChanges.pipe(
			tap((data) => console.log(`Form Data: ${data}`)),
			startWith(this.secondFormGroup.value),
			map((data) => data)
		);
	}

	/**
	 *
	 *  Validating input forms
	 *
	 * **/

	required(formGroup: FormGroup, formName: string) {
		const control = formGroup.get(`${formName}`);
		if (control) {
			return control.invalid && control.touched;
		} else {
			return null;
		}
	}

	get EmailError(): "required" | "invalid" | null {
		const email = this.firstFormGroup.controls["email"];

		if (email.hasError("required")) return "required";
		if (email.hasError("email")) return "invalid";
		else return null;
	}

	get cardNumberError(): "required" | "invalid" | null {
		const requiredField = this.required(this.secondFormGroup, "card");
		const cardNumberField = this.secondFormGroup.get("card");

		if (cardNumberField?.hasError("required")) return "required";
		if (cardNumberField?.hasError("cardError")) return "invalid";
		else return null;
	}

	get expiryError(): "required" | "invalid" | null {
		const expiryField = this.secondFormGroup.get("expiry");

		if (expiryField && expiryField.hasError("required")) return "required";
		if (expiryField && expiryField.hasError("pattern")) return "invalid";
		else return null;
	}

	get securityNumberError(): "required" | "invalid" | null {
		const cardSecurityNumberField =
			this.secondFormGroup.get("securityCode");
		if (
			cardSecurityNumberField &&
			cardSecurityNumberField.hasError("required")
		)
			return "required";

		if (
			cardSecurityNumberField &&
			cardSecurityNumberField.hasError("pattern")
		)
			return "invalid";

		return null;
	}

	// shippingNextButton(stepper: MatStepper): void {
	// 	const currentForm = this.firstFormGroup;
	// 	if (currentForm.valid) {
	// 		stepper.next();
	// 	} else {
	// 		for (const key in currentForm.controls) {
	// 			currentForm.controls[key].markAsTouched();
	// 		}
	// 	}
	// }

	// billingNextButton(stepper: MatStepper): void {
	// 	const currentForm = this.secondFormGroup;
	// 	if (currentForm.valid) {
	// 		stepper.next();
	// 	} else {
	// 		for (const key in currentForm.controls) {
	// 			currentForm.controls[key].markAsTouched();
	// 		}
	// 	}
	// }

	nextButton(stepper: MatStepper, formGroup: FormGroup): void {
		const currentForm =
			stepper.selectedIndex === 0
				? this.firstFormGroup
				: this.secondFormGroup;

		if (currentForm.valid) {
			stepper.next();
		} else {
			for (const key in currentForm.controls) {
				currentForm.controls[key].markAsTouched();
			}
		}
	}
}
