import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../shared/services/product.service";
import {IProduct} from "../product-spec";
import {Observable, of} from "rxjs";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
	productList$: Observable<IProduct[]> | undefined;
	product: string = '';

	constructor(private productService: ProductService, private cartService: CartService) {
	}

	ngOnInit(): void {
		this.productList$ = this.productService.filteredProducts$();
	}

	productTrackBy(index: number, product: IProduct): number {
		return <number>product.id;
	}

	addProductToCart(product: IProduct) {
		if (product) {
			this.cartService.addToCart(product)
			//this.isAdded = true;
			//this.showProductAddedToScreen(product);
		}
	}

	// showProductAddedToScreen(product: IProduct) {
	//   setTimeout(() => {
	//     this.product = product.title
	//     return this.product;
	//   }, 5000)
	// }
}
