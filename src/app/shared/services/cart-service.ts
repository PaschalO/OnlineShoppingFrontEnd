import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

// services
import { LocalStorageService } from "./local-storage.service";

// interfaces
import { IProduct } from "../../interface/product-interface";
import { ICart } from "../../interface/cart-interface";

@Injectable({
	providedIn: "root"
})
export class CartService {
	// pushes the total quantity to the consumers that needs it
	private cartItem = new BehaviorSubject({
		item: this.itemCount
	});

	public cartCount$ = this.cartItem.asObservable();

	private cart: ICart[] = [];

	constructor(private localStorage: LocalStorageService) {}

	/**
	 * Retrieves the item count from local storage.
	 *
	 * @returns {number} The item count. Returns 0 if no item count is found in local storage.
	 */
	get itemCount(): number {
		const itemCount = this.localStorage.getItem("item");
		return itemCount ? parseInt(itemCount, 10) : 0;
	}

	/**
	 * Sets the count of items in the shopping cart.
	 *
	 * @param {number} amount - The number of items to set.
	 */
	set itemCount(amount: number) {
		this.localStorage.addItem("item", amount.toString());
		this.cartItem.next({ item: amount });
	}

	/**
	 * Retrieves the cart items from the localStorage.
	 *
	 * @returns {ICart[]} An array of cart items.
	 */
	get cartItems(): ICart[] {
		try {
			return JSON.parse(this.localStorage.getItem("cart") || "[]");
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	// set cart array in localStorage
	/**
	 * Sets the items in the shopping cart.
	 *
	 * @param {ICart[]} item - An array of cart items to be added to the shopping cart.
	 */
	set cartItems(item: ICart[]) {
		try {
			this.localStorage.addItem("cart", JSON.stringify(item));
		} catch (e) {
			console.log(e);
		}
	}

	// clear cart from storage and reset the total quantity to 0
	/**
	 * Clears the cart by removing all items from the local storage and updating the cart item count.
	 *
	 * @memberof ClassName
	 * @function clearCart
	 * @returns {void}
	 *
	 * @example
	 * clearCart();
	 */
	clearCart() {
		try {
			this.localStorage.clear();
			//this.localStorage.deleteItem("cart");
			//this.localStorage.deleteItem("item");
			this.cartItem.next({ item: 0 });
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * Adds a product to the cart with the specified quantity.
	 *
	 * @param {IProduct} product - The product to add to the cart.
	 * @param {number} [quantity=1] - The quantity of the product to add. Default is 1.
	 * @return {void}
	 */
	addToCart(product: IProduct, quantity: number = 1): void {
		this.cart = this.cartItems || [];

		const foundIndex = this.cart.findIndex(
			(item) => item.id === product.id
		);

		// if the product exists
		if (foundIndex !== -1) {
			this.cart = this.cart.map((item) => {
				if (item.id === product.id) {
					return {
						...item,
						quantity: quantity + item.quantity
					};
				} else {
					return item;
				}
			});
		} else {
			this.cart = [
				...this.cart,
				{
					...product,
					quantity
				}
			];
		}

		this.cartItems = this.cart;
		this.itemCount = this.calculateTotalQuantity();
	}

	/**
	 * Updates the quantity of an item in the shopping cart.
	 *
	 * @param {ICart} shoppingCartItem - The shopping cart item to update.
	 */
	updateItemQuantityInCart(shoppingCartItem: ICart) {
		this.cart = this.cartItems;

		const foundIndex = this.cart.findIndex(
			(item) => item.id === shoppingCartItem.id
		);

		if (foundIndex !== -1) {
			this.cart = this.cart.map((item) => {
				if (item.id === shoppingCartItem.id) {
					return {
						...item,
						quantity: shoppingCartItem.quantity
					};
				} else {
					return {
						...item
					};
				}
			});
		} else {
			return;
		}

		this.cartItems = this.cart;
		this.itemCount = this.calculateTotalQuantity();
	}

	/**
	 * Remove a product from the cart.
	 *
	 * @param {ICart} cart - The cart object to remove the product from.
	 * @return {Array} The updated cart items after removing the product.
	 */
	removeProductFromCart(cart: ICart) {
		this.cart = this.cartItems;

		if (!this.cart) {
			this.itemCount = 0;
		} else {
			const filteredCartItems = this.cart.filter(
				(items) => items.id !== cart.id
			);
			this.cartItems = [...filteredCartItems];
			this.itemCount = this.calculateTotalQuantity();
		}

		return this.cartItems;
	}

	/**
	 * Calculates the total quantity of items in the cart.
	 *
	 * @returns {number} The total quantity of items in the cart.
	 */
	calculateTotalQuantity(): number {
		this.cart = this.cartItems;
		return this.cart.reduce(
			(previousValue: number, currentValue: ICart) =>
				previousValue + currentValue.quantity,
			0
		);
	}

	/**
	 * Calculates the grand total price of all items in the cart.
	 *
	 * @return {number} The grand total price of all items in the cart.
	 */
	calculateGrandTotalPrice(): number {
		this.cart = this.cartItems;
		return this.cart.reduce((previousValue: number, currentValue) => {
			return previousValue + currentValue.price * currentValue.quantity;
		}, 0);
	}

	/**
	 * Retrieves and displays the items in the cart.
	 *
	 * @returns {ICart[] | null} - An array of items in the cart or null if the cart is empty.
	 */
	displayItemsInCart(): ICart[] | null {
		this.cart = this.cartItems;

		if (this.cart) {
			return [...this.cart];
		} else {
			return null;
		}
	}

	/**
	 * Disables the cart icon based on the number of items in the cart.
	 *
	 * @returns An Observable that emits a boolean value indicating whether the cart icon should be disabled or not.
	 */
	disableCartIcon(): Observable<boolean> {
		return this.cartCount$.pipe(map((value) => value.item > 0));
	}
}
