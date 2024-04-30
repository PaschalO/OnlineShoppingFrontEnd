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

@Injectable({
	providedIn: "root" // registers the service
})
export class ProductService {
	private products: IProduct[] = [];
	private readonly productUrl: string = "http://localhost:3000/products";
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

	get accessToken() {
		return this.token;
	}

	set accessToken(token) {
		this.token = token;
	}

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

	get searchData(): FormControl {
		return this.searchText;
	}

	set searchData(text: FormControl) {
		this.searchText = text;
	}

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

	showSnackBar(itemName: string, message: string) {
		this._snackBar.open(`${itemName} ${message}`, "", {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: this.durationInSeconds * 1000
		});
	}
}
