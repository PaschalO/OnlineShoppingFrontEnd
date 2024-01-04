import {Component, OnInit} from '@angular/core';
import { ProductService } from "../../../../shared/services/product.service";
import {IProduct} from "../product-spec";
import {Observable, of} from "rxjs";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  productList$: Observable<IProduct[]> | undefined;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productList$ = this.productService.filteredProducts$();
  }
  productTrackBy(index: number, product: IProduct): number {
    return <number>product.id;
  }
}
