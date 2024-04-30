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
export class CartItemComponent {
	@Input() item!: ICart;
	@Output() deleteItem: EventEmitter<ICart> = new EventEmitter<ICart>();
	@Output() incrementItem: EventEmitter<ICart> = new EventEmitter<ICart>();
	@Output() decrementItem: EventEmitter<ICart> = new EventEmitter<ICart>();

	@ViewChild("numberInput", { static: false }) numberInput!: ElementRef;

	deleteButton: string = "delete";

	constructor() {}

	incrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepUp(1);
		this.item.quantity = parseInt(this.numberInput.nativeElement.value);
		this.incrementItem.emit(this.item);
	}

	decrementItemQuantityInCart(): void {
		this.numberInput.nativeElement.stepDown(1);
		this.item.quantity = parseInt(this.numberInput.nativeElement.value);
		this.decrementItem.emit(this.item);
	}

	delete(): void {
		this.deleteItem.emit(this.item);
	}
}
