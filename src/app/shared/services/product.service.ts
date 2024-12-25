import { Injectable } from "@angular/core";
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { IProduct } from "../../interface/product-interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
	catchError,
	map,
	Observable,
	of,
	retry,
	startWith,
	switchMap,
	tap
} from "rxjs";
import { FormControl } from "@angular/forms";
import { ErrorService } from "./error.service";
import environment from "../../environments/environment";

/**
 * Service that provides methods for retrieving and manipulating products.
 */
@Injectable({
	providedIn: "root" // registers the service
})
export class ProductService {
	private products: IProduct[] = [];
	private readonly productUrl: string = environment.auth.apiKey;
	private searchText: FormControl = new FormControl();
	private token: string = "";
	private httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.token}`
		})
	};

	private horizontalPosition: MatSnackBarHorizontalPosition = "center";
	private verticalPosition: MatSnackBarVerticalPosition = "top";
	private durationInSeconds: number = 2;

	constructor(
		private http: HttpClient,
		private _snackBar: MatSnackBar,
		private handleErrorService: ErrorService
	) {}

	/**
	 * Retrieves the access token of the object.
	 *
	 * @returns {string} The access token.
	 */
	get accessToken() {
		return this.token;
	}

	/**
	 * Set the access token for the authentication.
	 *
	 * @param {string} token - The access token to be set.
	 */
	set accessToken(token) {
		this.token = token;
	}

	/**
	 * Retrieves the products from the server.
	 * If products are already cached, returns the cached products.
	 *
	 * @returns {Observable<IProduct[]>} An observable that emits the products from the server.
	 */
	getProducts(): Observable<IProduct[]> {
		const token = this.accessToken;

		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			`Bearer ${token}`
		);

		if (this.products.length) {
			return of(this.products);
		}

		return this.http
			.get<IProduct[]>(`${this.productUrl}`, this.httpOptions)
			.pipe(
				tap((products) => (this.products = products)),
				retry({ count: 3, delay: 8000 }),
				catchError(this.handleErrorService.handleError)
			);
		// cache the products instead of sending request everytime to the server to fetch products
	}

	/**
	 * Retrieves a product with the given ID.
	 *
	 * @param {number} id - The ID of the product to retrieve.
	 * @return {Observable<IProduct | null>} - An Observable that emits the product with the given ID,
	 * or null if no such product exists.
	 */
	getProduct(id: number): Observable<IProduct | null> {
		return this.getProducts().pipe(
			map((products: IProduct[]): IProduct | null => {
				const product: IProduct | undefined = products.find(
					(product) => product.id === id
				);
				if (product) {
					return product;
				} else {
					return null;
				}
			})
		);
	}

	/**
	 * Updates a product.
	 *
	 * @param {IProduct} product - The product to be updated.
	 * @returns {Observable<IProduct>} - An observable containing the updated product.
	 */
	updateProduct(product: IProduct) {
		const token = this.accessToken;
		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			`Bearer ${token}`
		);

		return this.http
			.put<IProduct>(`${this.productUrl}`, product, this.httpOptions)
			.pipe(catchError(this.handleErrorService.handleError));
	}

	/**
	 * Returns the FormControl object used for the search text.
	 *
	 * @returns {FormControl} The FormControl object used for the search text.
	 */
	get searchData(): FormControl {
		return this.searchText;
	}

	/**
	 * Sets the value of the searchText property with the provided FormControl.
	 *
	 * @param {FormControl} text - The FormControl containing the search text.
	 */
	set searchData(text: FormControl) {
		this.searchText = text;
	}

	/**
	 * Returns an Observable that emits an array of filtered products based on the search text.
	 *
	 * The method retrieves products using the `getProducts` method and filters them based on the value of the `searchData` variable.
	 * If there is a search text provided, it will filter the products based on the product name.
	 * If there is no search text provided, it will return all products.
	 *
	 * @return {Observable<IProduct[]>} An Observable that emits an array of filtered products.
	 */
	filteredProducts$(): Observable<IProduct[]> {
		const fetchProducts = this.getProducts();
		return this.searchData.valueChanges.pipe(
			startWith(this.searchData.value), // Start with the current search text
			switchMap((text: string) => {
				// If there's a search text, filter the products; otherwise, return all products
				return text
					? fetchProducts.pipe(
							map((products) =>
								products.filter((product) =>
									product.name
										.toLowerCase()
										.includes(text.toLowerCase())
								)
							)
						)
					: fetchProducts;
			})
		);
	}

	/**
	 * Displays a snackbar with the given item name and message.
	 *
	 * @param {string} itemName - The name of the item to display in the snackbar.
	 * @param {string} message - The message to display in the snackbar.
	 * @return {void}
	 */
	showSnackBar(itemName: string, message: string) {
		this._snackBar.open(`${itemName} ${message}`, "", {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: this.durationInSeconds * 1000
		});
	}
}
