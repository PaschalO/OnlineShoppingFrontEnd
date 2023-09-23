import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AngularMaterialModule } from "../../../angularMaterial/angularMaterial.module";
import { CartItemComponent } from './cart-item/cart-item.component';
import { SharedModule } from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CartModule { }
