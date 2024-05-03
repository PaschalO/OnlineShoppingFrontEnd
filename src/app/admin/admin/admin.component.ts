import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild
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
export class AdminComponent implements OnInit, OnDestroy {
	@ViewChild("ctxProvider", { static: false }) ctxProvider!: ElementRef<
		typeof LR.UploadCtxProvider.prototype
	>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	/* variables for uploading images and making http requests */
	uploadedFiles: LR.OutputFileEntry[] = [];
	private api = "http://localhost:3000/products";
	products: IProduct[] = [];
	payload: IProduct[] = [];
	allProducts: IProduct[] | undefined;
	token: string = "";
	accessTokenSubscription!: Subscription;
	verifySubscription!: Subscription;
	isAdmin$: Observable<boolean> | undefined;

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
		if (this.ctxProvider) {
			this.ctxProvider.nativeElement.addEventListener(
				"change",
				this.handleUploadEvent
			);
			this.ctxProvider.nativeElement.addEventListener(
				"modal-close",
				this.handleDoneFlow
			);
		}
	}

  // Method to check if the logged-in user has a role of Admin
	fetchUserRole = () => {
		return this.userService
			.fetchUserRole$()
			.pipe(map((role) => role === "Admin"));
	};

	handleUploadEvent = (e: Event): void => {
		if (!(e instanceof CustomEvent)) {
			return;
		}

		if (e.detail) {
			this.uploadedFiles =
				this.ctxProvider.nativeElement.getOutputCollectionState().allEntries;
		}
	};

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

	createProduct() {
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
					error: (err) => console.log(err, "line 117")
				});
		} else {
			return null;
		}
	}

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

	fetchAllProducts() {
		this.productService.getProducts().subscribe((products) => {
			this.allProducts = products;
			this.dataSource = new MatTableDataSource(this.allProducts);

			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

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

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	private handleError() {
		return this.handleErrorService.handleError;
	}

	ngOnDestroy() {
		this.verifySubscription.unsubscribe();
		this.accessTokenSubscription.unsubscribe();
	}
}
