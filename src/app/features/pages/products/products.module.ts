import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AngularMaterialModule } from "../../../angularMaterial/angularMaterial.module";
import { ProductItemComponent } from "./product-item/product-item.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
	{ path: "", component: ProductListComponent },
	{ path: "products/:id", component: ProductDetailComponent }
];

@NgModule({
	declarations: [
		ProductListComponent,
		ProductDetailComponent,
		ProductItemComponent
	],

	imports: [
		CommonModule,
		NgOptimizedImage,
		AngularMaterialModule,
		FormsModule,
		RouterModule.forChild(routes)
	]
})
export class ProductsModule {}
