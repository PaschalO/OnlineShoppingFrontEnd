import {Component, Input} from '@angular/core';
import {ICart, IProduct} from "../../../../products/product-spec";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {
  @Input() product!: (ICart & IProduct) | null
  price: number = 69;
  quantity: number = 1;
  description: string = 'packages and web page editors now use Lorem Ipsum.';
  src: string = "https://placehold.co/400x250";
}
