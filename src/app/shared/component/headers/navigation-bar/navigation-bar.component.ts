import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart-service";
import { map, Observable } from "rxjs";
import { AuthenticationService } from "../../../services/authentication.service";
import { User } from "@auth0/auth0-angular";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";

/**
 * The NavigationBarComponent class represents the navigation bar component in the application.
 *
 * @class
 * @component
 */
@Component({
	selector: "app-navigation-bar",
	templateUrl: "./navigation-bar.component.html",
	styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
	isButtonEnabled$: Observable<boolean> | undefined;
	users$: Observable<User | null | undefined> | undefined;
	isAuthenticated$: Observable<Boolean> | undefined;
	isAdmin$: Observable<boolean> | undefined;

	/**
	 * Creates an instance of the class.
	 *
	 * @param {CartService} cartService - The service responsible for managing the shopping cart.
	 * @param {UserService} userService - The service responsible for user management.
	 * @param {AuthenticationService} authenticationService - The service responsible for authentication.
	 * @param {Router} router - The service responsible for routing.
	 */
	constructor(
		public cartService: CartService,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.isAuthenticated$ = this.verifyAuthentication();
	}
	ngOnInit(): void {
		this.isButtonEnabled$ = this.cartService.disableCartIcon();
		this.users$ = this.userService.userInfo;
		this.isAdmin$ = this.fetchUserRoles();
	}

	/**
	 * Logs the user in.
	 *
	 * @return {void}
	 */
	login() {
		this.authenticationService.login();
	}

	/**
	 * Logs out the user by calling the authentication service's logout method.
	 */
	logout() {
		this.authenticationService.logout();
	}

	/**
	 * Verify if the user is authenticated.
	 *
	 * @returns {boolean} True if the user is authenticated, false otherwise.
	 */
	verifyAuthentication() {
		return this.authenticationService.verifyIfUserIsAuthenticated();
	}

	/**
	 * Fetches the roles of the current user.
	 *
	 * @returns {Observable<boolean>} An observable that emits a boolean value indicating whether the current user is an admin or not.
	 */
	fetchUserRoles() {
		return this.userService
			.fetchUserRole$()
			.pipe(map((role) => role === "Admin"));
	}

	/**
	 * Navigates to the admin page.
	 *
	 * @returns {void}
	 */
	navigateToAdmin() {
		this.router.navigate(["admin"]);
	}
}
