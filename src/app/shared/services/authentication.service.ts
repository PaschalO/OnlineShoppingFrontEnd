import { Inject, Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { CartService } from "./cart-service";
import environment from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(
		private auth: AuthService,
		@Inject(DOCUMENT) private document: Document,
		private cartService: CartService
	) {}

	/**
	 * Logs in the user and redirects to the "/products" page.
	 *
	 * @method login
	 */
	login() {
		this.auth.loginWithRedirect({ appState: { target: "/products" } });
	}

	/**
	 * Logs out the user and clears the shopping cart.
	 *
	 * @description This method logs out the user by calling the `logout` method of the `auth` service and clears the shopping cart by calling the `clearCart` method of the `cartService`.
	 *
	 * @returns {void} This method does not return any value.
	 */
	logout() {
		this.auth.logout({
			logoutParams: {
				returnTo: environment.auth.redirect_uri
			}
		});
		this.cartService.clearCart();
	}

	/**
	 * Check if the user is authenticated.
	 *
	 * @return {Observable<boolean>} - Observable that emits a boolean value indicating whether the user is authenticated or not.
	 */
	verifyIfUserIsAuthenticated() {
		return this.auth.isAuthenticated$;
	}

	/**
	 * Fetches the access token using the auth service.
	 *
	 * @returns {Promise<string>} A promise that resolves with the access token.
	 */
	fetchAccessToken() {
		return this.auth.getAccessTokenSilently();
	}
}
