import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	map,
	Observable,
	Subject,
	switchMap,
	takeUntil,
	tap
} from "rxjs";

// services modules
import { CartService } from "../../../../../../shared/services/cart-service";
import { CheckoutService } from "../../../../../../shared/services/checkout.service";
import { AuthenticationService } from "../../../../../../shared/services/authentication.service";
import { ErrorService } from "../../../../../../shared/services/error.service";
import { UserService } from "../../../../../../shared/services/user.service";

// interfaces
import { ShippingFormInterface } from "../../../../../../interface/shipping-form-interface";
import { BillingFormInterface } from "../../../../../../interface/billing-form-interface";
import { ICart } from "../../../../../../interface/cart-interface";
import { MatStepper } from "@angular/material/stepper";

@Component({
	selector: "app-review-list",
	templateUrl: "./review-list.component.html",
	styleUrls: ["./review-list.component.css"]
})
export class ReviewListComponent implements OnInit, OnDestroy {
	/* global variables */
	shippingFormCustomer: Observable<any> | undefined;
	billingFormCustomer: Observable<any> | undefined;
	productItems: ICart[] | null;
	tax: number;
	shipping: number;
	totalPrice: number;
	private readonly api;
	userRole: string;
	@Input() stepper: MatStepper | undefined;

	private destroy$ = new Subject<void>();
	constructor(
		private cartService: CartService,
		public checkoutService: CheckoutService,
		private router: Router,
		private http: HttpClient,
		private authenticationService: AuthenticationService,
		private handleErrorService: ErrorService,
		private userService: UserService
	) {
		this.shipping = 0;
		this.totalPrice = 0;
		this.tax = 0.13;
		this.productItems = [];
		this.api = `http://localhost:3000/checkout/verify-purchase`;
		this.userRole = "";
	}

	ngOnInit(): void {
		this.productItems = this.viewCartItems();
		this.shippingFormCustomer = this.showShippingCustomerDetails();
		this.billingFormCustomer = this.showBillingCustomerDetails();
		this.totalPrice = this.showTotalPrice();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	viewCartItems(): ICart[] | null {
		return this.cartService.displayItemsInCart();
	}

	showTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	showShippingCustomerDetails(): Observable<Partial<ShippingFormInterface>> {
		return this.checkoutService.firstFormData.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map((data) => data)
		);
	}

	showBillingCustomerDetails(): Observable<Partial<BillingFormInterface>> {
		return this.checkoutService.secondFormData.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map((data) => data)
		);
	}

	fetchUserId() {
		return this.userService.fetchUserId$();
	}

	loadUserRole() {
		return this.userService.fetchUserRole$();
	}

	onSubmitForm() {
		const userInfo = this.checkoutService.secondFormData.getRawValue();
		const orderedItems = this.viewCartItems();

		this.fetchUserId()
			.pipe(
				takeUntil(this.destroy$), // manually unsubscribe after completion
				switchMap((id) => {
					if (!id) {
						throw new Error("User ID is undefined");
					}
					return this.loadUserRole().pipe(
						map((userRole) => ({ id, userRole }))
					);
				}),
				switchMap(({ id, userRole }) => {
					if (!userRole) {
						throw new Error("User role is undefined");
					}
					return this.authenticationService.fetchAccessToken().pipe(
						switchMap((token) => {
							const httpOptions = {
								headers: new HttpHeaders({
									"Content-Type": "application/json",
									Authorization: `Bearer ${token}`
								})
							};

							return this.http.post(
								`${this.api}`,
								{ id, userInfo, orderedItems, userRole },
								httpOptions
							);
						}),
						catchError((error) =>
							this.handleErrorService.handleError(error)
						)
					);
				})
			)
			.subscribe({
				next: () => this.navigateToConfirmationPage(),
				error: (error) => console.error("Error in onSubmitForm:", error)
			});
	}
	navigateToConfirmationPage() {
		this.stepper?.reset();
		this.router.navigate(["/confirmation-page"]);
	}
}
