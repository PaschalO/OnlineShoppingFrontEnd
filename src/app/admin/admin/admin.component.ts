import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
	AfterViewInit
} from "@angular/core";
import * as LR from "@uploadcare/blocks";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { productsData } from "../../Data/products";
import { IProduct } from "../../interface/product-interface";
import { catchError, map, Observable, Subscription, tap } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ErrorService } from "../../shared/services/error.service";
import { ProductService } from "../../shared/services/product.service";
import { UserService } from "../../shared/services/user.service";
import environment from "../../environments/environment";

LR.registerBlocks(LR);

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json"
	})
};

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild("ctxProvider", { static: false }) ctxProviderRef!: ElementRef<
		InstanceType<LR.UploadCtxProvider>
	>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	/* variables for uploading images and making http requests */
	uploadedFiles: LR.OutputFileEntry[] = [];
	private api = environment.auth.redirect_uri;
	products: IProduct[] = [];
	payload: IProduct[] = [];
	allProducts: IProduct[] | undefined;
	token: string = "";
	accessTokenSubscription!: Subscription;
	verifySubscription!: Subscription;
	isAdmin$: Observable<boolean> | undefined;
	error: string = "";

	// Variable for controlling the table display
	displayedColumns: string[] = [
		"created_at",
		"name",
		"image",
		"price",
		"category",
		"in_stock"
	];
	dataSource!: MatTableDataSource<IProduct>;
	constructor(
		private http: HttpClient,
		private handleErrorService: ErrorService,
		private authenticationService: AuthenticationService,
		private productService: ProductService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.products = [...productsData];
		this.fetchAccessToken();
		this.isAdmin$ = this.fetchUserRole();
	}

	ngAfterViewInit() {
		// access the dom element after it has been fully initialized
		setTimeout(() => {
			this.ctxProviderRef.nativeElement.addEventListener(
				"change",
				this.handleUploadEvent
			);
			this.ctxProviderRef.nativeElement.addEventListener(
				"modal-close",
				this.handleDoneFlow
			);
		}, 5000);
	}

	/**
	 * Fetches the user role.
	 *
	 * @returns {Observable<boolean>} An observable that emits a boolean value indicating if the user role is "Admin".
	 */
	fetchUserRole = () => {
		return this.userService
			.fetchUserRole$()
			.pipe(map((role) => role === "Admin"));
	};

	/**
	 * Handles the upload event.
	 *
	 * @param {Event} e - The event object.
	 * @returns {void}
	 */
	handleUploadEvent = (e: LR.EventMap["change"]): void => {
		if (!(e instanceof CustomEvent)) {
			return;
		}

		if (e.detail) {
			this.uploadedFiles =
				this.ctxProviderRef.nativeElement.getOutputCollectionState().allEntries;
		}
	};

	/**
	 * Updates the image property of products that match the uploaded file names
	 * and adds them to the payload array.
	 *
	 * @function handleDoneFlow
	 * @memberof [yourClass]
	 * @returns {void}
	 */
	handleDoneFlow = () => {
		this.uploadedFiles.forEach((imageName) => {
			const fileName = imageName.name.split(".jpg")[0];

			this.products.forEach((product) => {
				//console.log(product.name === fileName, 'line 66 from handleDoneFlow')
				if (product.name === fileName) {
					product.image = imageName.cdnUrl as string;
					this.payload = [...this.payload, product];
					//console.log(this.payload, 'line 70 from handleDoneFlow')
				}
			});
		});
	};

	/**
	 * Creates a product by making a POST request to the API.
	 *
	 * @return {Observable<Object>} An observable that emits the response from the API.
	 */
	createProduct() {
		console.log(this.payload, "line 147");
		if (this.payload.length > 0) {
			return this.http
				.post(`${this.api}`, this.payload, httpOptions)
				.pipe(
					tap((value) =>
						console.log(
							value,
							"inside the http line 86, create product"
						)
					),
					catchError(this.handleError())
				)
				.subscribe({
					next: (data) => console.log(data, "line 106"),
					error: (err) => (this.error = err)
				});
		} else {
			return null;
		}
	}

	/**
	 * Fetches the access token from the authentication service.
	 * Verifies the user's authentication status, and if the user is logged in,
	 * fetches the access token and sets it on the local variable 'token'.
	 *
	 * @return {void}
	 */
	fetchAccessToken() {
		this.verifySubscription = this.authenticationService
			.verifyIfUserIsAuthenticated()
			.subscribe((isLoggedIn) => {
				if (isLoggedIn) {
					this.accessTokenSubscription = this.authenticationService
						.fetchAccessToken()
						.subscribe((token) => {
							this.token = token;
						});
				}
			});
	}

	/**
	 * Fetches all products and updates the data source.
	 *
	 * @return {void}
	 */
	fetchAllProducts() {
		this.productService.getProducts().subscribe((products) => {
			this.allProducts = products;
			this.dataSource = new MatTableDataSource(this.allProducts);

			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	/**
	 * Update a product in the system.
	 *
	 * @param {IProduct} product - The product to be updated.
	 * @return {void}
	 */
	editProduct() {
		const product: IProduct = {
			id: 85,
			name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
			price: 8000,
			description:
				"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
			category: "jewelery",
			image: "https://ucarecdn.com/ab101a53-977c-4631-955b-9e6cddaf77b7/",
			in_stock: false
		};
		this.productService.accessToken = this.token.trim();
		this.productService
			.updateProduct(product)
			.subscribe((data) => console.log(data));
	}

	/**
	 * Applies a filter to the data source based on the provided event.
	 *
	 * @param {Event} event - The event object that triggered the filter.
	 * @return {void}
	 */
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	/**
	 * Retrieves the error handler function.
	 *
	 * @private
	 * @return {function} The error handler function.
	 */
	private handleError() {
		return this.handleErrorService.handleError;
	}

	ngOnDestroy() {
		this.verifySubscription.unsubscribe();
		this.accessTokenSubscription.unsubscribe();

		this.ctxProviderRef.nativeElement.removeEventListener(
			"change",
			this.handleUploadEvent
		);
		this.ctxProviderRef.nativeElement.removeEventListener(
			"modal-close",
			this.handleDoneFlow
		);
	}
}
