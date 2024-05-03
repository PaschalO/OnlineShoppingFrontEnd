import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from "@angular/core";

// interface
import { ICart } from "../../../../interface/cart-interface";

@Component({
	selector: "app-cart-item",
	templateUrl: "./cart-item.component.html",
	styleUrls: ["./cart-item.component.css"]
})
/**
 * Cart component logic for managing individual items in the cart.
 *
 * @class CartItemComponent
 */
export class CartItemComponent {
	@Input() item!: ICart;
	@Output() deleteItem: EventEmitter<ICart> = new EventEmitter<ICart>();
	@Output() incrementItem: EventEmitter<ICart> = new EventEmitter<ICart>();
	@Output() decrementItem: EventEmitter<ICart> = new EventEmitter<ICart>();

	@ViewChild("numberInput", { static: false }) numberInput!: ElementRef;

	deleteButton: string = "delete";

	constructor() {}

	/**
	 * Increases the quantity of this cart item. The new quantity is then emitted to the parent component.
	 *
	 * @returns {void}
	 */
	incrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepUp(1);
		this.item.quantity = parseInt(this.numberInput.nativeElement.value);
		this.incrementItem.emit(this.item);
	}

	/**
	 * Decreases the quantity of this cart item. The new quantity lower limit is one and it is then emitted to the parent component.
	 *
	 * @returns {void}
	 */
	decrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepDown(1);
		this.item.quantity = parseInt(this.numberInput.nativeElement.value);
		this.decrementItem.emit(this.item);
	}

	/**
	 * Emits a delete event for this cart item to the parent component.
	 *
	 * @returns {void}
	 */
	delete(): void {
		this.deleteItem.emit(this.item);
	}
}
