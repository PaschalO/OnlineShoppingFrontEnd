import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct } from "../../../../interface/product-interface";
import { Router } from "@angular/router";

@Component({
	selector: "app-product-item",
	templateUrl: "./product-item.component.html",
	styleUrls: ["./product-item.component.css"]
})

/**
 * Product item component logic. Facilitates the display of individual product
 * items and handling item interactions such as navigating to the product's
 * detail page and adding it to cart.
 *
 * @class ProductItemComponent
 */
export class ProductItemComponent {
	@Input() product: IProduct | undefined;
	@Output() addedProduct: EventEmitter<IProduct> =
		new EventEmitter<IProduct>();

	constructor(private router: Router) {}

	/**
	 * Navigates to the detail page of a product whose ID is provided.
	 *
	 * @param {number | undefined} id - The product ID
	 * @returns {void}
	 */
	showProduct(id: number | undefined): void {
		this.router.navigate(["/products", id]);
	}

	/**
	 * Emits the 'addedProduct' event with the selected product as argument.
	 * This is typically used for adding the product to the shopping cart.
	 *
	 * @param {IProduct} product - The product to be added to the cart
	 * @returns {void}
	 */
	addToCart(product: IProduct) {
		this.addedProduct.emit(product);
	}
}
