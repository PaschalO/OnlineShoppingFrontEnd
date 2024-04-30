import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// services
import { CartService } from "../../../../shared/services/cart-service";
import { ProductService } from "../../../../shared/services/product.service";

// interface
import { ICart } from "../../../../interface/cart-interface";

@Component({
	selector: "app-cart-list",
	templateUrl: "./cart-list.component.html",
	styleUrls: ["./cart-list.component.css"]
})
export class CartListComponent implements OnInit {
	title: string = "Shopping Cart";
	cartList: ICart[] | null = [];
	buttonCheckout: string = "proceed to checkout";
	totalItemsInCart: number = 0;
	totalPriceInCart: number = 0;

	constructor(
		private cartService: CartService,
		private router: Router,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.cartList = this.displayShoppingCart();
		this.totalItemsInCart = this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();
	}

	displayShoppingCart() {
		return this.cartService.displayItemsInCart();
	}

	displayTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	displayTotalQuantity(): number {
		return this.cartService.calculateTotalQuantity();
	}

	incrementCartItem(item: ICart) {
		this.cartService.updateItemQuantityInCart(item);
		this.totalItemsInCart = this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();

		const message: string = "has been added";
		this.productService.showSnackBar(item.name, message);
	}

	decrementCartItem(item: ICart) {
		if (item.quantity === 0) {
			this.removeItemFromCart(item);
			this.totalItemsInCart = this.displayTotalQuantity();
			this.totalPriceInCart = this.displayTotalPrice();
			const message: string = "has been removed from the cart";
			this.productService.showSnackBar(item.name, message);
		} else {
			this.cartService.updateItemQuantityInCart(item);
			this.totalItemsInCart = this.displayTotalQuantity();
			this.totalPriceInCart = this.displayTotalPrice();
			const message: string = "has been removed";
			this.productService.showSnackBar(item.name, message);
		}
	}

	removeItemFromCart(item: ICart) {
		this.cartList = this.cartService.removeProductFromCart(item);
		this.totalItemsInCart = this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();
		const message: string = "has been removed from the cart";
		this.productService.showSnackBar(item.name, message);
	}

	showCheckOutPage(): void {
		this.router.navigate(["/checkout"]);
	}
}
