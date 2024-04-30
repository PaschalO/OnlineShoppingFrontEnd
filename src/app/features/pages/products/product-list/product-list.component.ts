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

	addProductToCart(product: IProduct) {
		if (product) {
			this.cartService.addToCart(product);
			const message: string = "has been added";
			this.productService.showSnackBar(product.name, message);
		}
	}
}
