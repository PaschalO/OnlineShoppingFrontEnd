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
	takeUntil
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

	/**
	 * Constructs an instance of ReviewListComponent
	 * It sets initial values for variables, initializes services, etc.
	 *
	 * @constructor
	 * @param {CartService} cartService
	 * @param {CheckoutService} checkoutService
	 * @param {Router} router
	 * @param {HttpClient} http
	 * @param {AuthenticationService} authenticationService
	 * @param {ErrorService} handleErrorService
	 * @param {UserService} userService
	 */

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

	/**
	 * Cleanup logic when the component is destroyed.
	 *
	 * @lifecycle OnDestroy
	 * @returns {void}
	 */
	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	/**
	 * Returns the current cart items in the cart service
	 *
	 * @returns {ICart[] | null} - Array of cart items, or null if no items
	 */
	viewCartItems(): ICart[] | null {
		return this.cartService.displayItemsInCart();
	}

	/**
	 * Returns the total cart price
	 *
	 * @returns {number} - Total price of the cart
	 */
	showTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	/**
	 * Observes changes in shipping form details.
	 *
	 * @returns {Observable<Partial<ShippingFormInterface>>} - Observable emitting values of shipping form details
	 */
	showShippingCustomerDetails(): Observable<Partial<ShippingFormInterface>> {
		return this.checkoutService.firstFormData.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map((data) => data)
		);
	}

	/**
	 * Observes changes in billing form details.
	 *
	 * @returns {Observable<Partial<BillingFormInterface>>} - Observable emitting values of billing form details
	 */
	showBillingCustomerDetails(): Observable<Partial<BillingFormInterface>> {
		return this.checkoutService.secondFormData.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map((data) => data)
		);
	}

	/**
	 * Retrieves the user id from the user service.
	 *
	 * @returns {Observable<userId>} - Observable returning user's id
	 */
	fetchUserId() {
		return this.userService.fetchUserId$();
	}

	/**
	 * Retrieves the role of the user from user service.
	 *
	 * @method loadUserRole
	 * @returns {Observable<role>} - Returns an observable that emits the user's role
	 */
	loadUserRole() {
		return this.userService.fetchUserRole$();
	}

	/**
	 * Performs validations before submitting the form.
	 * Collects form details, validates user id, role, and makes an API call for performing the transaction.
	 *
	 * @returns {void}
	 */
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
