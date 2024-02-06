import {Component, OnInit} from '@angular/core';
import {ICart} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-cart-list',
	templateUrl: './cart-list.component.html',
	styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit {
	title: string = 'Shopping Cart';
	cartList: ICart[] | null = [];
	buttonCheckout: string = 'proceed to checkout';
	totalItemsInCart: number = 0;
	totalPriceInCart: number = 0;

	constructor(private cartService: CartService, private router: Router) {}

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
		this.totalItemsInCart =  this.displayTotalQuantity();
		this.totalPriceInCart = this.displayTotalPrice();
	}

	decrementCartItem(event: { product: ICart, quantity: number }) {
		if (event.quantity === 0) {
			this.removeItemFromCart(event.product.id)
		} else {
			this.cartService.updateItemQuantityInCart(event.product)
			this.totalItemsInCart =  this.displayTotalQuantity();
			this.totalPriceInCart = this.displayTotalPrice();
		}
	}

	removeItemFromCart(id: number) {
		this.cartList = this.cartService.removeProductFromCart(id)
	}

	showCheckOutPage(): void {
		this.router.navigate(['/checkout']);
	}

}
