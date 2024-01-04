import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signUpFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator })
  }
  navigateToLoginForm() {
    this.router.navigate(['account/sign-in']);
  }

  passwordMatchValidator(signUpGroup: AbstractControl): ValidationErrors | null {
    const password = signUpGroup.get('password')?.value;
    const confirmPassword = signUpGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  getPasswordError(): 'required' | 'passwordLengthError' | '' {
    const passwordError = this.signUpFormGroup.controls['password'];

    if (passwordError.hasError('required')) return 'required';
    if (passwordError.hasError('minlength')) return 'passwordLengthError';

    else return ''
  }

  signUp() {
    const newCustomer = this.signUpFormGroup;

    if (newCustomer.valid) {
      // submit the form to the backend
      console.log(newCustomer.value)
      this.http.post<object>('', newCustomer.value).subscribe({
        next: (response => console.log('form has been submitted!', response)),
        error: (error => console.log('We found an error in submitting this form', error))
      })
    }

    else {
      for (const key in this.signUpFormGroup.controls) {
        this.signUpFormGroup.controls[key].markAsTouched();
      }
    }

  }
}
