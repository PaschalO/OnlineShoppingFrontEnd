import {Component, OnInit} from '@angular/core';
import {ICart, IProduct} from "../../products/product-spec";
import {Observable, tap} from "rxjs";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
  title: string = 'Shopping Cart';

  filteredProductList$: Observable<((ICart & IProduct) | null)[]> | undefined
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.displayShoppingCart();
  }

  displayShoppingCart() {
    this.filteredProductList$ = this.cartService.showCart().pipe(
        tap(value => console.log(value))
    );
  }

  onDeleteItem(id: number) {
    this.filteredProductList$ = this.cartService.removeItem(id)
  }
}
