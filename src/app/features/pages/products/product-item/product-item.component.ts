import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../product-spec";
import {Router} from "@angular/router";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {
	@Input() product: IProduct | undefined;
	@Output() addedProduct: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	constructor(private router: Router) {
	}

	showProduct(id: number | undefined): void {
		this.router.navigate(['/products', id]);
	}

	addToCart(product: IProduct) {
		this.addedProduct.emit(product);
	}
}
