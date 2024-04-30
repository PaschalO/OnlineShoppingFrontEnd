import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-checkout-form",
	templateUrl: "./checkout-form.component.html",
	styleUrls: ["./checkout-form.component.css"]
})
export class CheckoutFormComponent {
	@Input() parent!: FormGroup;

	required(formName: string) {
		const control = this.parent.get(`${formName}`);
		if (control) {
			return control.invalid && control.touched;
		} else {
			return null;
		}
	}

	get phoneNumberError(): "required" | "invalid" | "" {
		const phoneError = this.parent.get("phoneNumber");

		if (phoneError && phoneError.hasError("required")) return "required";
		if (phoneError && phoneError.hasError("pattern")) return "invalid";
		else return "";
	}

	get postalCodeError(): "required" | "invalid" | "" {
		const postalCodeError = this.parent.get("postalCode");

		if (postalCodeError && postalCodeError.hasError("required"))
			return "required";

		if (postalCodeError && postalCodeError.hasError("pattern"))
			return "invalid";
		else return "";
	}
}
