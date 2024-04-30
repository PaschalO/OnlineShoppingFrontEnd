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

	get itemCount(): number {
		const itemCount = this.localStorage.getItem("item");
		return itemCount ? parseInt(itemCount, 10) : 0;
	}

	set itemCount(amount: number) {
		this.localStorage.addItem("item", amount.toString());
		this.cartItem.next({ item: amount });
	}

	// get cart array from localStorage
	get cartItems(): ICart[] {
		try {
			return JSON.parse(this.localStorage.getItem("cart") || "[]");
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	// set cart array in localStorage
	set cartItems(item: ICart[]) {
		try {
			this.localStorage.addItem("cart", JSON.stringify(item));
		} catch (e) {
			console.log(e);
		}
	}

	// clear cart from storage and reset the total quantity to 0
	clearCart() {
		try {
			this.localStorage.deleteItem("cart");
			this.localStorage.deleteItem("item");
			this.cartItem.next({ item: 0 });
		} catch (e) {
			console.log(e);
		}
	}

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

	// calculates the total quantity in a cart
	calculateTotalQuantity(): number {
		this.cart = this.cartItems;
		return this.cart.reduce(
			(previousValue: number, currentValue: ICart) =>
				previousValue + currentValue.quantity,
			0
		);
	}

	// calculates the total price in the cart
	calculateGrandTotalPrice(): number {
		this.cart = this.cartItems;
		return this.cart.reduce((previousValue: number, currentValue) => {
			return previousValue + currentValue.price * currentValue.quantity;
		}, 0);
	}

	displayItemsInCart(): ICart[] | null {
		this.cart = this.cartItems;

		if (this.cart) {
			return [...this.cart];
		} else {
			return null;
		}
	}

	disableCartIcon(): Observable<boolean> {
		return this.cartCount$.pipe(map((value) => value.item > 0));
	}
}
