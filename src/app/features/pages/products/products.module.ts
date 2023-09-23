import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AngularMaterialModule } from "../../../angularMaterial/angularMaterial.module";
import { ProductItemComponent } from './product-item/product-item.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent
  ],
  exports: [
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        AngularMaterialModule,
        FormsModule,
    ]
})
export class ProductsModule { }
