import {Component, Input} from '@angular/core';
import {IProduct} from "../product-spec";
import {Router} from "@angular/router";
import {CartService} from "../../../../shared/services/cart-service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: IProduct | undefined;

  constructor(private router: Router, private cartService: CartService) {}
  showProduct(id: number | undefined): void {
    this.router.navigate(['/products', id]);
  }

  addToCart(productId: number | undefined): void {
    if (productId){
      this.cartService.addToCart(productId)
    }

  }
}
