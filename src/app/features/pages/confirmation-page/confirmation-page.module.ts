import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../../../angularMaterial/angularMaterial.module";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmationPageComponent } from "./confirmation-page.component";

export const routes: Routes = [
	{ path: "confirmation-page", component: ConfirmationPageComponent }
];

@NgModule({
	declarations: [ConfirmationPageComponent],

	imports: [
		CommonModule,
		AngularMaterialModule,
		RouterModule.forChild(routes)
	]
})
export class ConfirmationPageModule {}
