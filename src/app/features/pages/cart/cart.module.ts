import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import { AngularMaterialModule } from "../../../angularMaterial/angularMaterial.module";
import { CartItemComponent } from './cart-item/cart-item.component';
import { SharedModule } from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  exports: [
    CartListComponent
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
