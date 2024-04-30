import { Component } from "@angular/core";
import { CartService } from "../../services/cart-service";

@Component({
	selector: "app-cart-subtotal",
	templateUrl: "./cart-subtotal.component.html",
	styleUrls: ["./cart-subtotal.component.css"]
})
export class CartSubtotalComponent {
	orderSummary: string = "Order summary";
	buttonCheckout: string = "proceed to checkout";

	constructor(private cartService: CartService) {}

	showOrderSummary() {
		return this.cartService.calculateGrandTotalPrice();
	}
}
