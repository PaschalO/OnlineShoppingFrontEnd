import {Component, OnInit} from '@angular/core';
import {ICart, IProduct} from "../../products/product-spec";
import {map, Observable, of, tap} from "rxjs";
import {CartService} from "../../../../shared/services/cart-service";
import {ItemQuantityService} from "../../../../shared/services/item-quantity.service";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit{
  title: string = 'Shopping Cart';
  total: number = 0;
  //quantity!: number;
  //index!: number

  filteredProductList$!: Observable<((ICart & IProduct) | null)[]>

  grandTotalPrice: Observable<number> | undefined;
  constructor(private cartService: CartService, private itemQuantityService: ItemQuantityService) {}

  ngOnInit(): void {
    this.filteredProductList$ = this.displayShoppingCart();
    this.calculateGrandTotalPrice().subscribe((v) => {
      this.total = v
    });
    //this.calculateGrandTotalPrice();
    //this.updateProductQuantity(this.quantity, this.index)
  }

  displayShoppingCart() {
    return this.cartService.productItem.pipe(
        tap(value => console.log(value, 'from cart-list'))
    );
  }

  onDeleteItem(id: number) {
    this.filteredProductList$ = this.cartService.removeItem(id)
  }
  calculateGrandTotalPrice() {
    return this.filteredProductList$.pipe(
      map(v=> {
        return v.filter((s) => s !== null).reduce((total, product) => {
          if (product) {
            return total + (product.price * product.quantity)
          }

          else return total;
        }, 0)
      })
    )
  }

  // updateProductQuantity(quantity: number, index: number) {
  //   console.log(index, 'index');
  //   console.log(quantity, 'quantity');
  //   //this.index = index;
  //   //this.quantity = quantity;
  //
  //   const hello =  this.filteredProductList$.pipe(
  //     map((products) => {
  //       const product =  products.find((product, i) => i === index);
  //         tap(value => console.log(value))
  //         //console.log(i, 'index')
  //         if (product) {
  //           product.quantity = this.quantity;
  //
  //           return product;
  //           //
  //           //return {...product, quantity}
  //         }
  //         return product;
  //     })
  //   )
  //
	//   this.calculateGrandTotalPrice();
  //   this.displayShoppingCart();
  //   return hello;
  //
  // }
}
