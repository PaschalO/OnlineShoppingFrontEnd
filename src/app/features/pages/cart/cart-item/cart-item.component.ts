import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ICart} from "../../products/product-spec";

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.css']
})

export class CartItemComponent {
	@Input() product!: ICart;
	@Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();
	@Output() incrementItem: EventEmitter<ICart> = new EventEmitter<ICart>();
	@Output() decrementItem: EventEmitter<{ product: ICart, quantity: number }> = new EventEmitter<{
		product: ICart,
		quantity: number
	}>();

	@ViewChild('numberInput', {static: false}) numberInput!: ElementRef;

	deleteButton: string = 'delete';

	constructor() {
	}

	incrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepUp(1);
		this.product.quantity = parseInt(this.numberInput.nativeElement.value);
		this.incrementItem.emit(this.product);
	}

	decrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepDown(1);
		this.product.quantity = parseInt(this.numberInput.nativeElement.value);
		this.decrementItem.emit({product: this.product, quantity: this.product.quantity});
	}

	delete(): void {
		this.deleteItem.emit(this.product?.id);
	}
}
