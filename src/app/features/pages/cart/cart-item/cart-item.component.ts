import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CustomStepUpService} from "../../../../shared/services/custom-step-up.service";
import {ICart} from "../../products/product-spec";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})

export class CartItemComponent implements OnInit{
  @Input() product!: ICart | null;
  @Output() deleteItem= new EventEmitter<number>();
  @ViewChild('numberInput', {static: false}) numberInput!: ElementRef;

  updatedPrice: number = 0;
  deleteButton: string = 'delete';
  quantity: number | undefined;
  constructor(private itemQ: CustomStepUpService, private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.product?.quantity;
    this.updatedPrice = this.updatePrice(this.product?.price, this.quantity)
  }

  increment(): void {
    this.quantity = this.itemQ.increment(this.numberInput.nativeElement, this.numberInput.nativeElement);
    this.cartService.addToCart(this.product!);
    this.updatedPrice = this.updatePrice(this.product?.price, this.quantity);
  }

  decrement(): void {
    this.quantity = this.itemQ.decrement(this.numberInput.nativeElement, this.numberInput.nativeElement);
    this.cartService.reduceItemQuantityFromCart(this.product!);
    this.updatedPrice = this.updatePrice(this.product?.price, this.quantity);
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
