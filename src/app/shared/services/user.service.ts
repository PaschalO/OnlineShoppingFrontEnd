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

	/**
	 * Retrieves the user information.
	 *
	 * @return {Observable<User>} An Observable that emits the user information.
	 */
	get userInfo() {
		return (this.users$ = this.auth.user$);
	}

	/**
	 * Fetches the user ID from the users$ observable.
	 *
	 * @returns {Observable<string>} An observable that emits the user ID.
	 */
	fetchUserId$() {
		return this.users$.pipe(
			map((user) => {
				return `${user?.[`${this.auth0CustomNameSpace}`]}`;
			})
		);
	}

	/**
	 * Retrieves the role of the user from the `users$` Observable.
	 *
	 * @return {Observable<string>} An Observable that emits the role of the user.
	 */
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
