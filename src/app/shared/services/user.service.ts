import { Injectable } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private users$!: Observable<User | null | undefined>;
	private readonly auth0CustomClaimNameSpace;
	private auth0CustomNameSpace;

	constructor(private auth: AuthService) {
		this.auth0CustomNameSpace = `https://customstorefront.com/user_id`;
		this.auth0CustomClaimNameSpace = `https://customstorefront.com/roles`;
	}

	get userInfo() {
		return (this.users$ = this.auth.user$);
	}

	/*
	 *  Extract user id from Auth0 Custom claim
	 * */
	fetchUserId$() {
		return this.users$.pipe(
			map((user) => {
				return `${user?.[`${this.auth0CustomNameSpace}`]}`;
			})
		);
	}

	/*
	 * Extract user role from the Auth0 custom claim
	 *
	 * */
	fetchUserRole$() {
		return this.users$.pipe(
			map((user) => {
				return `${user?.[`${this.auth0CustomClaimNameSpace}`]}`.split(
					"|"
				)[1];
			})
		);
	}
}
