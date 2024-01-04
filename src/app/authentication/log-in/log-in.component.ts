import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  loginFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  navigateToSignUpForm() {
    this.router.navigate(['account/create-an-account'])
  }

  login() {
    const existingCustomer = this.loginFormGroup;

    if (existingCustomer.valid) {
      // submit the form to the backend
      console.log(existingCustomer.value);
      this.http.post<object>('', existingCustomer.value).subscribe({
        next: (response => console.log('form has been submitted!', response)),
        error: (error => console.log('We found an error in submitting this form', error))
      })
    }

    else {
      for (const key in this.loginFormGroup.controls) {
        this.loginFormGroup.controls[key].markAsTouched();
      }
    }
  }
}
