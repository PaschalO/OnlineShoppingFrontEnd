import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ItemQuantityService} from "../../../../shared/services/item-quantity.service";
import {ICart, IProduct} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";
import {OrderSummaryService} from "../../../../shared/services/order-summary.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})

export class CartItemComponent implements OnInit{
  @Input() product!: (ICart & IProduct) | null;
  @Output() deleteItem= new EventEmitter<number>();

  //@Output() updateQuantityItem = new EventEmitter<number>;
  //price: number = 69;
  updatedPrice!: number;
  //@Ou-al: number | undefined = 0;
  //description: string = 'packages and web page editors now use Lorem Ipsum.';
  deleteButton: string = 'delete';
  favoritesButton: string = 'add to favorites';
  quantity: number | undefined;
  //src: string = "https://placehold.co/400x250";


  @ViewChild('numberInput', {static: false}) numberInput!: ElementRef;

  constructor(private itemQ: ItemQuantityService, private cartService: CartService, private orderSummaryService: OrderSummaryService) {}

  ngOnInit(): void {
    this.quantity = this.product?.quantity;
    // //this.updatedPrice = this.product?.price;
    this.updatedPrice = this.updatePrice(this.product?.price, this.quantity)
    // //this.calculateTotal(this.updatedPrice);
    // //this.totalPriceChanged.emit(this.updatedPrice);
    // //this.increment();1
    // //this.decrement();
    // this.orderSummaryService.calculateTotal();
    // //this.orderSummaryService.orderSummaryPrice = this.updatedPrice;
  }

  increment(): void {
    this.quantity = this.itemQ.increment(this.numberInput.nativeElement, this.numberInput.nativeElement);
    this.cartService.addToCart(this.product?.id);
    this.updatedPrice = this.updatePrice(this.product?.price, this.quantity);
    this.cartService.updateProductQuantity(this.product?.id, this.quantity)
      this.cartService.productItem;

       //this.updateQuantityItem.emit(this.quantity);

    // this.itemQ.increment(this.numberInput.nativeElement, this.numberInput.nativeElement);
    // if (this.quantity && this.product) {
    //   this.quantity = this.numberInput.nativeElement.value;
    //   this.updatedPrice = this.updatePrice(this.product.price, this.quantity);
    //   //this.orderSummaryService.orderSummaryPrice = this.updatedPrice;
    //   //this.totalPriceChanged.emit(this.updatedPrice);
    //   this.calculateTotal();
    //   //this.orderSummaryService.orderSummaryPrice = this.updatedPrice;
    //   //this.orderSummaryService.calculateTotal();
    //   this.cartService.addToCart(this.product.id);
    //}

    //else return;
  }

  decrement(): void {
	  this.quantity = this.itemQ.decrement(this.numberInput.nativeElement, this.numberInput.nativeElement);
	  this.cartService.removeSingleItem(this.product?.id, parseInt(String(this.quantity)));
	  this.updatedPrice = this.updatePrice(this.product?.price, this.quantity);
	  this.cartService.updateProductQuantity(this.product?.id, this.quantity);

    // this.itemQ.decrement(this.numberInput.nativeElement, this.numberInput.nativeElement);
    // if (this.quantity && this.product) {
    //   this.quantity = parseInt(this.numberInput.nativeElement.value);
    //   //console.log(this.quantity)
    //   this.updatedPrice = this.updatePrice(this.product.price, this.quantity);
    //   //this.orderSummaryService.orderSummaryPrice = this.updatedPrice;
    //   //this.totalPriceChanged.emit(this.updatedPrice);
    //   //this.calculateTotal();
    //   //console.log(this.updatedPrice)
    //   this.calculateTotal();
    //   //this.orderSummaryService.orderSummaryPrice = this.updatedPrice;
    //   //this.orderSummaryService.calculateTotal();
    //   this.cartService.removeSingleItem(this.product.id, parseInt(String(this.quantity)));
    // }
    //
    // else return;
  }

   delete(): void {
  //   this.deleteItem.emit(this.product?.id);
   }

  updatePrice(price: number | undefined, quantity: number | undefined): number {
    if (price && quantity) {
      return price * quantity;
    }
    return 0;
  }

  // calculateTotal() {
  //   console.log('hello')
  //   this.orderSummaryService.calculateTotal();
  // }
}
