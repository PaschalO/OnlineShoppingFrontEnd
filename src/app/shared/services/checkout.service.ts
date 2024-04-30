import { Injectable } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators
} from "@angular/forms";

@Injectable({
	providedIn: "root"
})
export class CheckoutService {
	private readonly firstFormGroup: FormGroup;
	private readonly secondFormGroup: FormGroup;

	controls = {
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		country: ["", [Validators.required]],
		address: ["", [Validators.required]],
		unit: [""],
		city: ["", [Validators.required]],
		province: ["", [Validators.required]],
		postalCode: [
			"",
			[
				Validators.required,
				Validators.pattern(
					/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i
				)
			]
		],
		phoneNumber: [
			"",
			[
				Validators.required,
				Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
			]
		]
	};

	constructor(private _fb: FormBuilder) {
		this.firstFormGroup = this._fb.group(this.controls);

		this.secondFormGroup = this._fb.group({
			...this.controls,
			card: ["", [Validators.required, this.creditCardLuhnValidator()]],
			expiry: [
				"",
				[Validators.required, Validators.pattern(/^[0-9]{4}$/)]
			],
			securityCode: [
				"",
				[Validators.required, Validators.pattern(/^[0-9]{3}$/)]
			],
			billingAddress: ["2"]
		});
	}

	get firstFormData(): FormGroup {
		return this.firstFormGroup;
	}

	get secondFormData(): FormGroup {
		return this.secondFormGroup;
	}

	/*
	 * From stackOverFlow with some slight modifications
	 *
	 * */
	private creditCardLuhnValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const regex = new RegExp("^[0-9]{16}$");
			if (!regex.test(control.value)) return { cardError: true };
			else {
				let sum = 0;
				for (let i = 0; i < control.value.length; i++) {
					let intVal = parseInt(control.value.substring(i, i + 1));
					if (i % 2 === 0) {
						intVal = intVal * 2;
						if (intVal > 9) {
							intVal = 1 + (intVal % 10);
						}
					}
					sum = sum + intVal;
				}
				const cardNumber = sum % 10 === 0;
				return !cardNumber ? { cardError: true } : null;
			}
		};
	}
}
