import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  address: string = '';
  contactNumber: number = 0;
  unit: string = '';
  city: string = '';
  province: string = '';
  postalCode: string = '';

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
    phoneNumber: ['', [ Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/) ]]
  }
  constructor(private _fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.firstFormGroup = this._fb.group(this.controls);

    this.secondFormGroup = this._fb.group(
      {
          ...this.controls,
          card: ['', [Validators.required]],
          expiry: ['', [Validators.required]],
          securityCode: ['', [Validators.required]],
          paymentAddress: ['']
      });
  }

  ngOnInit() {

  }

  getEmailError(): "required" | "invalid" | '' {
    const emailError = this.firstFormGroup.controls['email'];

    if (emailError.hasError('required')) return 'required';
    if (emailError.hasError('email')) return 'invalid'
    else return '';
  }

  getPhoneNumberError(): "required" | "invalid" | '' {
    const phoneError = this.firstFormGroup.controls['phoneNumber'];

    if (phoneError.hasError('required')) return "required";
    if (phoneError.hasError('pattern')) return "invalid"

    else return '';
  }

  getSecondPhoneNumberError(): "required" | "invalid" | '' {
    const secondFormGroupPhoneError = this.secondFormGroup.controls['phoneNumber'];

    if (secondFormGroupPhoneError.hasError('required')) return 'required';
    if (secondFormGroupPhoneError.hasError('pattern')) return 'invalid';

    else return '';
  }

  getPostalCodeError(): "required" | '' {
    const postalCodeError = this.firstFormGroup.controls['postalCode'];
    const secondFormPostalCodeError = this.secondFormGroup.controls['postalCode'];

    if (postalCodeError.hasError('required') || secondFormPostalCodeError.hasError('required')) return 'required';
    else return '';
  }

  getCardNumberError(): "required" | '' {
    const cardNumberError =  this.secondFormGroup.controls['card'];

    if (cardNumberError.hasError('required')) return 'required';
    else return '';
  }

  getExpiryError(): 'required' | '' {
    const expiryField = this.secondFormGroup.controls['expiry'];

    if (expiryField.hasError('required')) return 'required';
    return '';
  }

	getSecurityNumber(): 'required' | ''  {
		const cardSecurityNumberField = this.secondFormGroup.controls['securityCode'];
		if (cardSecurityNumberField.hasError('required')) return 'required';
		return '';
	}

  hideBillingAddress() {
    const addressSelection = this.secondFormGroup.controls['paymentAddress'];
    return addressSelection.value;
  }

  hideShippingAddress() {
    this.unit = this.firstFormGroup.controls['unit'].value;

	  if (this.unit) {
      this.address = `${this.firstFormGroup.controls['unit'].value}-${this.firstFormGroup.controls['address'].value}`;
    }

    else {
      this.address = this.firstFormGroup.controls['address'].value;
    }

	  this.contactNumber = this.firstFormGroup.controls['phoneNumber'].value;
    this.postalCode = this.firstFormGroup.controls['postalCode'].value;
    this.province = this.firstFormGroup.controls['province'].value;
    this.city = this.firstFormGroup.controls['city'].value;
    return this.secondFormGroup.controls['paymentAddress'].value;
  }


  nextButton(stepper: MatStepper): void {
    const currentForm = stepper.selectedIndex === 0 ? this.firstFormGroup : this.secondFormGroup;
    if (currentForm.valid) {
      stepper.next();
    }

    else {
      for (const key in currentForm.controls) {
        console.log(currentForm.value.firstName)
        currentForm.controls[key].markAsTouched();
      }
    }
  }
}
