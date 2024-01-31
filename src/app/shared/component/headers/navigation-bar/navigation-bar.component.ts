import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart-service";
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from '@angular/common';
import {Observable} from "rxjs";

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

	isButtonEnabled$: Observable<boolean> | undefined;
	users$ = this.auth.user$;

	constructor(public cartService: CartService, public auth: AuthService, @Inject(DOCUMENT) private document: Document) {
	}

	ngOnInit(): void {
		this.isButtonEnabled$ = this.cartService.disableCartIcon();
	}

	loginWithRedirect() {
		this.auth.loginWithRedirect();
	}

	logout() {
		this.auth.logout({
			logoutParams: {
				returnTo: this.document.location.origin
			}
		});
	}
}
