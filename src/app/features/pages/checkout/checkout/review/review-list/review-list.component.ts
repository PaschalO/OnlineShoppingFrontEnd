import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ICart, IProduct} from "../../../../products/product-spec";
import {CartService} from "../../../../../../shared/services/cart-service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})

export class ReviewListComponent implements OnInit{

  productItems: ICart[] | null = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productItems = this.viewCartItems();
  }

  viewCartItems(): ICart[] | null {
    return this.cartService.displayItemsInCart();
  }

  productTrackBy(index: number, product: (ICart & IProduct) | null) {
    if (product) return <number>product.id;

    else return null
  }

}
