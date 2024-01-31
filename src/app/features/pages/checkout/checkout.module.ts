import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentFormComponent} from "./checkout/payment-form/payment-form.component";
import {AngularMaterialModule} from "../../../angularMaterial/angularMaterial.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ReviewListComponent} from './checkout/review/review-list/review-list.component';
import {CheckoutFormComponent} from "./checkout/checkout-form/checkout-form.component";
import {ReviewItemComponent} from './checkout/review/review-item/review-item.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "@auth0/auth0-angular";
import {ConfirmationPageModule} from "../confirmation-page/confirmation-page.module";

export const routes: Routes = [
	{path: 'checkout', component: CheckoutComponent},
]

@NgModule({
	declarations: [
		CheckoutComponent,
		PaymentFormComponent,
		ReviewListComponent,
		CheckoutFormComponent,
		ReviewItemComponent
	],
	imports: [
		CommonModule,
		AngularMaterialModule,
		ReactiveFormsModule,
		SharedModule,
		ConfirmationPageModule,
		RouterModule.forChild(routes)
	]
})
export class CheckoutModule {
}
