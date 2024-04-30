import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart-service";
import { map, Observable } from "rxjs";
import { AuthenticationService } from "../../../services/authentication.service";
import { User } from "@auth0/auth0-angular";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";

@Component({
	selector: "app-navigation-bar",
	templateUrl: "./navigation-bar.component.html",
	styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
	isButtonEnabled$: Observable<boolean> | undefined;
	users$: Observable<User | null | undefined> | undefined;
	isAuthenticated$: Observable<Boolean> | undefined;
	userRole$: Observable<boolean> | undefined;

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
		this.userRole$ = this.fetchUserRoles();
	}

	login() {
		this.authenticationService.login();
	}

	logout() {
		this.authenticationService.logout();
	}

	verifyAuthentication() {
		return this.authenticationService.verifyIfUserIsAuthenticated();
	}

	fetchUserRoles() {
		return this.userService
			.fetchUserRole$()
			.pipe(map((role) => role === "Admin"));
	}

	navigateToAdmin() {
		this.router.navigate(["admin"]);
	}
}
