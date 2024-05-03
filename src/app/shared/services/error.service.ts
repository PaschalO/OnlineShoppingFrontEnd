import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

/**
 * Service class for handling errors.
 */
@Injectable({
	providedIn: "root"
})
export class ErrorService {
	constructor() {}

	/**
	 * Handles the HTTP error response and logs the error message.
	 * If the error status is 0, it is considered as a client-side or network error.
	 * If the error status is 404, it is considered as a resource not found error.
	 * If the error status is greater than or equal to 500, it is considered as a server error.
	 *
	 * @param error - The HTTP error response object.
	 * @returns An observable that throws an error with a user-facing error message.
	 */
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
