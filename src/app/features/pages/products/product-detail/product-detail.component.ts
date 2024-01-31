import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../shared/services/product.service";
import {IProduct} from "../product-spec";
import {Observable} from "rxjs";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
	product$: Observable<IProduct | null> | undefined;
	value: number = 1;
	@ViewChild('numberInput', {static: false}) numberInput!: ElementRef;

	constructor(private route: ActivatedRoute, private ProductService: ProductService, private CartService: CartService) {
	}

	ngOnInit(): void {
		this.getProduct();
	}

	getProduct(): void {
		const productId: number = Number(this.route.snapshot.paramMap.get('id'));
		this.product$ = this.ProductService.getProduct(productId)
	}

	increment(): void {
		this.numberInput.nativeElement.stepUp(1);
	}

	decrement(): void {
		this.numberInput.nativeElement.stepDown(1);
	}

	addToCart(product: IProduct): void {
		this.value = parseInt(this.numberInput.nativeElement.value);
		if (product) {
			this.CartService.addToCart(product, this.value);
		}
		// reset the item quantity back to 1
		this.numberInput.nativeElement.value = 1;
		this.value = this.numberInput.nativeElement.value;
	}
}
