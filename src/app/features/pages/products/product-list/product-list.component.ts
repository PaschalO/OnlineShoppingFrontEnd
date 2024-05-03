import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../../shared/services/product.service";
import { IProduct } from "../../../../interface/product-interface";
import { Observable } from "rxjs";
import { CartService } from "../../../../shared/services/cart-service";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})

/**
 * Product list component logic. Facilitates the display of all products and
 * handles interactions with the product list.
 *
 * @class ProductListComponent
 * @implements {OnInit}
 */
export class ProductListComponent implements OnInit {
	productList$: Observable<IProduct[]> | undefined;
	product: string = "";
	constructor(
		private productService: ProductService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.productList$ = this.productService.filteredProducts$();
		this.productList$.subscribe((data) => console.log(data));
	}

	productTrackBy(index: number, product: IProduct): number {
		return <number>product.id;
	}

	/**
	 * Adds a product to the cart.
	 *
	 * @param {IProduct} product - The product to be added to the cart.
	 *
	 * @return {void} - This method doesn't return anything.
	 */
	addProductToCart(product: IProduct) {
		if (product) {
			this.cartService.addToCart(product);
			const message: string = "has been added";
			this.productService.showSnackBar(product.name, message);
		}
	}
}
