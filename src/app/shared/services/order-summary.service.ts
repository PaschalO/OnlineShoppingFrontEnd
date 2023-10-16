import {Injectable} from '@angular/core';
import {CartService} from "./cart-service";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  private price: number | undefined;


  constructor(private cartService: CartService ) { }

  private cartProducts = this.cartService.showCart();
  set orderSummaryPrice(price: number | undefined) {
    if (price) {
      this.price = price;
      //this.calculateTotal();
      console.log(this.price, 'line 14 for price')
    }
  }

  get orderSummaryPrice(): number | undefined {
    console.log(this.price, 'line 18 for price')
    return this.price;
  }

  // calculateTotal() {
  //   return this.cartProducts.pipe(
  //       map((v) => v.reduce((previousValue, currentValue) => {
  //         // @ts-ignore
  //         return previousValue + currentValue?.price;
  //       }, 0)
  //       )
  //   ).pipe(
  //     tap(value => console.log(value))
  //   )
  // }
}
