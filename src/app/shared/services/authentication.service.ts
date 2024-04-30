import { Inject, Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { CartService } from "./cart-service";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(
		private auth: AuthService,
		@Inject(DOCUMENT) private document: Document,
		private cartService: CartService
	) {}

	login() {
		this.auth.loginWithRedirect({ appState: { target: "/products" } });
	}

	logout() {
		this.auth.logout({
			logoutParams: {
				returnTo: "http://localhost:4200/products"
			}
		});

		this.cartService.clearCart();
	}

	verifyIfUserIsAuthenticated() {
		return this.auth.isAuthenticated$;
	}

	fetchAccessToken() {
		return this.auth.getAccessTokenSilently();
	}
}
