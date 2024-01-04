import {Component, OnInit} from '@angular/core';
import {ICart} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit{
  title: string = 'Shopping Cart';
  cartList: ICart[] | null = [];
  buttonCheckout: string = 'proceed to checkout';
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartList = this.displayShoppingCart();
  }

  displayShoppingCart() {
    return this.cartService.displayItemsInCart();
  }

  removeItemFromCart(id: number) {
    this.cartList = this.cartService.removeProductFromCart(id)
  }

  displayTotalPrice(): number {
    return this.cartService.calculateGrandTotalPrice();
  }
  showCheckOutPage(): void {
    this.router.navigate(['/checkout']);
  }

  displayTotalQuantity(): number {
    return this.cartService.calculateTotalQuantity();
  }
}
