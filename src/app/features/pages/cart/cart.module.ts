import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartListComponent} from './cart-list/cart-list.component';
import {AngularMaterialModule} from "../../../angularMaterial/angularMaterial.module";
import {CartItemComponent} from './cart-item/cart-item.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {CheckoutModule} from "../checkout/checkout.module";

export const routes: Routes = [
	{path: 'cart', component: CartListComponent},
]

@NgModule({
	declarations: [
		CartListComponent,
		CartItemComponent
	],

	imports: [
		CommonModule,
		AngularMaterialModule,
		SharedModule,
		ReactiveFormsModule,
		FormsModule,
		CheckoutModule,
		RouterModule.forChild(routes)

	]
})
export class CartModule {
}
