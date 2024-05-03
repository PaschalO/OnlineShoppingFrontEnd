import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-checkout-form",
	templateUrl: "./checkout-form.component.html",
	styleUrls: ["./checkout-form.component.css"]
})
export class CheckoutFormComponent {
	@Input() parent!: FormGroup;

	/**
	 * Check if a form control is required and returns its validation status.
	 *
	 * @method required
	 * @param {string} formName - Name of the form control
	 * @returns {boolean|null} - Returns 'true' if the form control is invalid and has been touched.
	 * If the control does not exist, returns null.
	 */
	required(formName: string) {
		const control = this.parent.get(`${formName}`);
		if (control) {
			return control.invalid && control.touched;
		} else {
			return null;
		}
	}

	/**
	 * Validator for phone number's form control which checks if it is required or invalid(pattern mismatch).
	 *
	 * @method phoneNumberError
	 * @returns {"required" | "invalid" | ""} - Returns 'required' if the form control has required error.
	 * Returns 'invalid' if the form control has pattern error. If no errors, returns an empty string.
	 */
	get phoneNumberError(): "required" | "invalid" | "" {
		const phoneError = this.parent.get("phoneNumber");

		if (phoneError && phoneError.hasError("required")) return "required";
		if (phoneError && phoneError.hasError("pattern")) return "invalid";
		else return "";
	}

	/**
	 * Validator for postal code's form control which checks if it is required or invalid(pattern mismatch).
	 *
	 * @method postalCodeError
	 * @returns {"required" | "invalid" | ""} - Returns 'required' if the form control has required error.
	 * Returns 'invalid' if the form control has pattern error. If no errors, returns an empty string.
	 */
	get postalCodeError(): "required" | "invalid" | "" {
		const postalCodeError = this.parent.get("postalCode");

		if (postalCodeError && postalCodeError.hasError("required"))
			return "required";

		if (postalCodeError && postalCodeError.hasError("pattern"))
			return "invalid";
		else return "";
	}
}
