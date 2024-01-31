import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CartService} from "./cart-service";

@Injectable({
	providedIn: 'root'
})

export class CheckoutService {

	private readonly firstFormGroup: FormGroup;
	private readonly secondFormGroup: FormGroup;

	controls = {
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		country: ['', [Validators.required]],
		address: ['', [Validators.required]],
		unit: [''],
		city: ['', [Validators.required]],
		province: ['', [Validators.required]],
		postalCode: ['', [Validators.required, Validators.maxLength(6)]],
		phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
	}

	constructor(private _fb: FormBuilder, private http: HttpClient, private cartService: CartService) {
		this.firstFormGroup = this._fb.group(this.controls);

		this.secondFormGroup = this._fb.group(
			{
				...this.controls,
				card: ['', [Validators.required]],
				expiry: ['', [Validators.required]],
				securityCode: ['', [Validators.required]],
				billingAddress: ['']
			});
	}

	get firstFormData(): FormGroup {
		return this.firstFormGroup;
	}

	get secondFormData(): FormGroup {
		return this.secondFormGroup;
	}

	submitCheckOutForm() {
		const combinedCheckOutFormData = {...this.firstFormData.getRawValue(), ...this.secondFormData.getRawValue(), ...this.cartService.cartItems}
		// provide api link to submit to the backend
		// below code will submit to the backend-api
		console.log('from line 50', combinedCheckOutFormData)
		this.http.post<object>('', combinedCheckOutFormData).subscribe({
			next: (response => console.log('form has been submitted!', response)),
			error: (error => console.log('We found an error in submitting this form', error))
		})
	}
}
