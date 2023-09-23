import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.firstFormGroup = this._fb.group({
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
    })

    this.secondFormGroup = this._fb.group({
      card: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
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
    })
  }

  ngOnInit() {}
  getEmailError(): "required" | "invalid" | null {
    const emailError = this.firstFormGroup.controls['email'];
    if (emailError.hasError('required')) return 'required';
    if (emailError.hasError('email')) return 'invalid'
    else return null;
  }

  getPhoneNumberError(): "required" | "invalid" | null {
    const phoneError = this.firstFormGroup.controls['phoneNumber'];
    if (phoneError.hasError('required')) return 'required';
    if (phoneError.hasError('pattern')) return 'invalid';
    else return null;
  }

  getPostalCodeError() {
    const postalCodeError = this.firstFormGroup.controls['postalCode'];
    if (postalCodeError.hasError('required')) return 'required';
    else return null;
  }

  showErrors() {
    //console.log(this.firstFormGroup.getError())

  }

  handleSubmit() {

    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup.value)
    } else {
      console.log('Invalid form')
    }
  }
}
