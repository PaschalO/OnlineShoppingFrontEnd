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

/**
 * Cart component logic for managing the items in the shopping cart.
 *
 * @class CartListComponent
 * @implements {OnInit}
 */
export class CartListComponent implements OnInit {
	title: string = "Shopping Cart";
	cartList: ICart[] | null = [];
	buttonCheckout: string = "proceed to checkout";
	totalItemsInCart: number = 0;
	totalPriceInCart: number = 0;

	/**
	 * Constructs an instance of CartListComponent
	 *
	 * @constructor
	 * @param {CartService} cartService
	 * @param {Router} router
	 * @param {ProductService} productService
	 */
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

	/**
	 * Displays all items in the shopping cart.
	 *
	 * @returns {ICart[]} - Array of items in the cart
	 */
	displayShoppingCart() {
		return this.cartService.displayItemsInCart();
	}

	/**
	 * Calculates and displays the total price of all items in the cart.
	 *
	 * @returns {number} - Total price of all items in the cart
	 */
	displayTotalPrice(): number {
		return this.cartService.calculateGrandTotalPrice();
	}

	/**
	 * Calculates and displays the total quantity of all items in the cart
	 *
	 * @returns {number} - Total quantity of all items in the cart
	 */
	displayTotalQuantity(): number {
		return this.cartService.calculateTotalQuantity();
	}

	/**
	 * Increments the quantity of a specific item in the cart.
	 * Updates total quantity and total price, and shows a snack bar notification.
	 *
	 * @param {ICart} item - The item for which the quantity needs to be incremented
	 * @returns {void}
	 */
	incrementCartItem(item: ICart) {
		this.cartService.updateItemQuantityInCart(item);
		this.totalItemsInCart = this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();

		const message: string = "has been added";
		this.productService.showSnackBar(item.name, message);
	}

	/**
	 * Decrements the quantity of a specific item in the cart. If the quantity reaches zero, the item is removed.
	 * Updates total quantity and total price, and shows a snack bar notification.
	 *
	 * @param {ICart} item - The item for which the quantity needs to be decremented
	 * @returns {void}
	 */
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

	/**
	 * Removes a specific item from the shopping cart.
	 * Updates total quantity and total price, and shows a snack bar notification.
	 *
	 * @param {ICart} item - The item to be removed from the cart
	 * @returns {void}
	 */
	removeItemFromCart(item: ICart) {
		this.cartList = this.cartService.removeProductFromCart(item);
		this.totalItemsInCart = this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();
		const message: string = "has been removed from the cart";
		this.productService.showSnackBar(item.name, message);
	}

	/**
	 * Navigates to the checkout page.
	 *
	 * @returns {void}
	 */
	showCheckOutPage(): void {
		this.router.navigate(["/checkout"]);
	}
}
