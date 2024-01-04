import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersModule } from "./component/headers/headers.module";
import { InputNumberFormComponent } from './component/input-number-form/input-number-form.component';
import { FormsModule } from "@angular/forms";
import { CartSubtotalComponent } from './component/cart-subtotal/cart-subtotal.component';
import { AngularMaterialModule } from "../angularMaterial/angularMaterial.module";

@NgModule({
  declarations: [
    InputNumberFormComponent,
    CartSubtotalComponent,
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    InputNumberFormComponent,
    CartSubtotalComponent
  ]
})
export class SharedModule { }
