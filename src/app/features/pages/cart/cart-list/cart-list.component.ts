import {Component, OnInit} from '@angular/core';
import {ICart} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";
import {CustomStepUpService} from "../../../../shared/services/custom-step-up.service";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit{
  title: string = 'Shopping Cart';
  total: number = 0;

  cartList: ICart[] | null = []

  constructor(private cartService: CartService, private itemQuantityService: CustomStepUpService) {}

  ngOnInit(): void {
    this.cartList = this.displayShoppingCart();
    this.total = this.cartService.calculateGrandTotalPrice();
  }

  displayShoppingCart() {
    return this.cartService.displayItemsInCart();
  }

  removeItemFromCart(id: number) {
    this.cartList = this.cartService.removeProductFromCart(id)
  }
}
