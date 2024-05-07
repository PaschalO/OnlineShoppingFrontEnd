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

	/**
	 * Handles the change event when selecting an address.
	 *
	 * @param {any} event - The event object representing the change event.
	 * @return {void}
	 */
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

	/**
	 * Retrieves the total price of all items in the cart.
	 *
	 * @returns {number} The total price of all items in the cart.
	 */
	showTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	/**
	 * Get the total quantity of items in the cart.
	 *
	 * @return {number} The total quantity of items in the cart.
	 */
	showTotalItemQuantity() {
		return this.cartService.calculateTotalQuantity();
	}

	/**
	 * Retrieves the value changes of the "billingAddress" form control in the secondFormGroup
	 * and maps it to a boolean value indicating if the selected value is equal to "1"
	 *
	 * @return {Observable<boolean>} An observable that emits the boolean value indicating if the selected value is equal to "1"
	 */
	showCheckOutFormSelection() {
		return this.secondFormGroup.controls[
			"billingAddress"
		].valueChanges.pipe(
			startWith(this.firstFormGroup.get("billingAddress")?.value),
			map((value) => value === "1")
		);
	}

	/**
	 * Returns an Observable that emits a partial ShippingFormInterface object representing the customer details entered in the shipping form.
	 *
	 * @return {Observable<Partial<ShippingFormInterface>>} An Observable that emits a partial ShippingFormInterface object.
	 *
	 * @example
	 * showShippingFormCustomerDetails().subscribe((customerDetails) => {
	 *     // Process the customer details
	 * });
	 */
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
	 * Function to validate input forms.
	 *
	 * @param {FormGroup} formGroup - The form group containing the input form.
	 * @param {string} formName - The name of the input form to validate.
	 *
	 * @returns {boolean | null} Returns true if the input form is invalid and has been touched, or null if the form control does not exist.
	 */

	required(formGroup: FormGroup, formName: string) {
		const control = formGroup.get(`${formName}`);
		if (control) {
			return control.invalid && control.touched;
		} else {
			return null;
		}
	}

	/**
	 * Returns the error type for the email input field.
	 *
	 * @returns {"required" | "invalid" | null} The error type for the email input field.
	 */
	get EmailError(): "required" | "invalid" | null {
		const email = this.firstFormGroup.controls["email"];

		if (email.hasError("required")) return "required";
		if (email.hasError("email")) return "invalid";
		else return null;
	}

	/**
	 * Retrieves the error status of the card number field.
	 *
	 * @returns {string | null} - The error status of the card number field. Possible values are "required", "invalid", or null.
	 */
	get cardNumberError(): "required" | "invalid" | null {
		const cardNumberField = this.secondFormGroup.get("card");

		if (cardNumberField?.hasError("required")) return "required";
		if (cardNumberField?.hasError("cardError")) return "invalid";
		else return null;
	}

	/**
	 * Gets the expiry error of the form field.
	 *
	 * @return {string | null} The expiry error. Possible values are "required", "invalid", or null.
	 */
	get expiryError(): "required" | "invalid" | null {
		const expiryField = this.secondFormGroup.get("expiry");

		if (expiryField && expiryField.hasError("required")) return "required";
		if (expiryField && expiryField.hasError("pattern")) return "invalid";
		else return null;
	}

	/**
	 * Returns the error message related to the security number field.
	 * The possible error messages are "required", "invalid", or null if there are no errors.
	 *
	 * @returns {string | null} - The error message for the security number field.
	 */
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

	/**
	 * Advances to the next step in the mat stepper if the current form is valid.
	 * If the current form is invalid, marks all form controls as touched.
	 *
	 * @param {MatStepper} stepper - The mat stepper component.
	 *
	 * @return {void} - This method does not return a value.
	 */
	nextButton(stepper: MatStepper): void {
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
