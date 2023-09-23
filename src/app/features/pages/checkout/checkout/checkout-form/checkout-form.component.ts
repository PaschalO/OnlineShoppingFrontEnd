// import {Component, Input} from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//
// @Component({
//   selector: 'app-checkout-form',
//   templateUrl: './checkout-form.component.html',
//   styleUrls: ['./checkout-form.component.css']
// })
// export class CheckoutFormComponent {
//   @Input() parent!: FormGroup;
//   firstFormGroup: FormGroup;
//
//   constructor(private _fb: FormBuilder) {
//     this.firstFormGroup = this._fb.group({
//       firstName: ['', [Validators.required]],
//       lastName: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       country: ['', [Validators.required]],
//       address: ['', [Validators.required]],
//       unit: [''],
//       city: ['', [Validators.required]],
//       province: ['', [Validators.required]],
//       postalCode: ['', [Validators.required, Validators.maxLength(6)]],
//       phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
//     })
//   }
//   getPhoneNumberError(): "required" | "invalid" | null {
//     const phoneError = this.firstFormGroup.controls['phoneNumber'];
//     if (phoneError.hasError('required')) return 'required';
//     if (phoneError.hasError('pattern')) return 'invalid';
//     else return null;
//   }
//
//   getPostalCodeError() {
//     const postalCodeError = this.firstFormGroup.controls['postalCode'];
//     if (postalCodeError.hasError('required')) return 'required';
//     else return null;
//   }
// }
