import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ItemQuantityService} from "../../../../shared/services/item-quantity.service";
import {ICart, IProduct} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{
  @Input() product!: (ICart & IProduct) | null;
  @Output() deleteItem= new EventEmitter<number>();
  //price: number = 69;
  updatedPrice: number | undefined;
  //description: string = 'packages and web page editors now use Lorem Ipsum.';
  deleteButton: string = 'delete';
  favoritesButton: string = 'add to favorites';
  quantity: number | undefined;
  //src: string = "https://placehold.co/400x250";


  @ViewChild('numberInput', {static: false}) numberInput!: ElementRef;

  constructor(private itemQ: ItemQuantityService, private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.product?.quantity;
    this.updatedPrice = this.product?.price;
  }

  increment(): void {
    this.itemQ.increment(this.numberInput.nativeElement, this.numberInput.nativeElement);

    if (this.quantity && this.product) {
      this.quantity = this.numberInput.nativeElement.value;
      this.updatedPrice = this.updatePrice(this.product.price ,this.quantity);
      this.cartService.addToCart(this.product.id);
    }

    else return;
  }

  decrement(): void {
    this.itemQ.decrement(this.numberInput.nativeElement, this.numberInput.nativeElement);
    if (this.quantity && this.product) {
      this.quantity = parseInt(this.numberInput.nativeElement.value);
      this.updatedPrice = this.updatePrice(this.product.price ,this.quantity);
      this.cartService.removeSingleItem(this.product.id, this.quantity);
    }

    else return;
  }

  delete(): void {
    this.deleteItem.emit(this.product?.id);
  }

  updatePrice(price: number | undefined, quantity: number | undefined): number {
    if (price && quantity) {
      return price * quantity;
    }
    return 0;
  }
}
