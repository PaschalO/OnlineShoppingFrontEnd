import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ErrorService {
	constructor() {}

	handleError(error: HttpErrorResponse): Observable<never> {
		if (error.status === 0) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error("An error occurred:", error.error);
		}
		// The backend returned an unsuccessful response code.
		else {
			if (error.status === 404) {
				console.error(
					`the requested resource was not found`,
					error.error
				);
			} else if (error.status >= 500) {
				console.error(
					`server error, please try again later`,
					error.error
				);
			}
		}
		// Return an observable with a user-facing error message.
		return throwError(
			() => new Error("Something bad happened; please try again later.")
		);
	}
}
