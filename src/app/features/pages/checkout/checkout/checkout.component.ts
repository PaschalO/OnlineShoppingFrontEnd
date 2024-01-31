import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {CartService} from "../../../../shared/services/cart-service";
import {CheckoutService} from "../../../../shared/services/checkout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit, OnDestroy{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  totalPriceOfCart: number = 0;
  totalItemsInCart: number = 0;
  shippingFormCustomer: Record<string, string> | undefined;

  private shippingFormSubscription$: Subscription | undefined;

  constructor(private checkoutService: CheckoutService, private cartService: CartService) {
    this.firstFormGroup = this.checkoutService.firstFormData;
    this.secondFormGroup = this.checkoutService.secondFormData;
  }

  ngOnInit() {
    this.totalPriceOfCart = this.showTotalPrice();
    this.totalItemsInCart = this.showTotalItemQuantity();

    this.shippingFormSubscription$ = this.showShippingFormCustomerDetails()
        .valueChanges.subscribe((data) => this.shippingFormCustomer = data);
  }

  ngOnDestroy(): void {
    this.shippingFormSubscription$?.unsubscribe();
  }
  onAddressSelectionChange() {
    if (this.secondFormGroup.controls['billingAddress'].value === '1' ) {
      this.secondFormGroup.patchValue(this.firstFormGroup.value);
    }

    else {
      this.secondFormGroup.patchValue({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        address: '',
        unit: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
        billingAddress: '2'
      })
    }
  }

  showTotalPrice(): number {
    return this.cartService.calculateGrandTotalPrice();
  }

  showTotalItemQuantity() {
    return this.cartService.calculateTotalQuantity();
  }

  showShippingFormCustomerDetails() {
    return this.checkoutService.firstFormData;
  }

  /**
   *
   *  Validating input forms
   *
   * **/

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

  nextButton(stepper: MatStepper): void {
    const currentForm = stepper.selectedIndex === 1 ? this.firstFormGroup : this.secondFormGroup;
    if (currentForm.valid) {
      stepper.next();
    }

    else {
      for (const key in currentForm.controls) {
        currentForm.controls[key].markAsTouched();
      }
    }
  }
}
