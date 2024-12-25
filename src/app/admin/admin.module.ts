import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { AdminComponent } from "./admin/admin.component";
import { RouterModule, Routes } from "@angular/router";
import { AngularMaterialModule } from "../angularMaterial/angularMaterial.module";
import { AuthGuard } from "@auth0/auth0-angular";

export const routes: Routes = [{ path: "", component: AdminComponent }];

@NgModule({
	declarations: [AdminComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgOptimizedImage,
		AngularMaterialModule
	],
	exports: [AdminComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
