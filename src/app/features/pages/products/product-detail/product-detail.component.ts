import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { IProduct } from "../../../../interface/product-interface";
import { Observable } from "rxjs";
import { CartService } from "../../../../shared/services/cart-service";

@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.css"]
})

/**
 * Product detail component logic. Includes fetching the specific product, handling
 * item quantity and adding the product to cart.
 *
 * @class ProductDetailComponent
 * @implements {OnInit}
 */
export class ProductDetailComponent implements OnInit {
	product$: Observable<IProduct | null> | undefined;
	value: number = 1;
	@ViewChild("numberInput", { static: false }) numberInput!: ElementRef;

	/**
	 * Constructs an instance of ProductDetailComponent
	 *
	 * @constructor
	 * @param {ActivatedRoute} route
	 * @param {ProductService} productService
	 * @param {CartService} CartService
	 */
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private CartService: CartService
	) {}

	ngOnInit(): void {
		this.getProduct();
	}

	/**
	 * Fetches the product whose ID is provided in the URL parameters.
	 * The product is assigned to the local 'product$' Observable.
	 *
	 * @returns {void}
	 */
	getProduct(): void {
		const productId: number = Number(
			this.route.snapshot.paramMap.get("id")
		);
		this.product$ = this.productService.getProduct(productId);
	}

	/**
	 * Increases the quantity of the product to be added to the cart.
	 *
	 * @returns {void}
	 */
	increment(): void {
		this.numberInput.nativeElement.stepUp(1);
	}

	/**
	 * Decreases the quantity of the product to be added to the cart.
	 * The lower limit is one.
	 *
	 * @returns {void}
	 */
	decrement(): void {
		this.numberInput.nativeElement.stepDown(1);
	}

	/**
	 * Adds the selected product and the defined quantity to the shopping cart.
	 * Shows a snack bar notification on successful addition.
	 * Resets the quantity back to one after adding to cart.
	 *
	 * @param {IProduct} product - The product to be added to the cart
	 * @returns {void}
	 */
	addToCart(product: IProduct): void {
		this.value = parseInt(this.numberInput.nativeElement.value);
		if (product) {
			this.CartService.addToCart(product, this.value);
		}
		// reset the item quantity back to 1
		this.numberInput.nativeElement.value = 1;
		this.value = this.numberInput.nativeElement.value;

		const message: string = "has been added";
		this.productService.showSnackBar(product.name, message);
	}
}
