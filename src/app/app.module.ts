import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ProductsModule } from "./features/pages/products/products.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { CartModule } from "./features/pages/cart/cart.module";
import { SharedModule } from "./shared/shared.module";
import { HeadersModule } from "./shared/component/headers/headers.module";
import { CheckoutModule } from "./features/pages/checkout/checkout.module";
import { ConfirmationPageModule } from "./features/pages/confirmation-page/confirmation-page.module";
import { AuthModule } from "@auth0/auth0-angular";
import { AngularMaterialModule } from "./angularMaterial/angularMaterial.module";
import { AdminModule } from "./admin/admin.module";
import environment from "./environments/environment";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AdminModule,
		ProductsModule,
		CartModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule,
		RouterOutlet,
		AppRoutingModule,
		HeadersModule,
		ConfirmationPageModule,
		CheckoutModule,
		AuthModule.forRoot({
			domain: environment.auth.domain,
			clientId: environment.auth.clientId,
			authorizationParams: {
				redirect_uri: environment.auth.redirect_uri,
				audience: environment.auth.audience
			},
			cacheLocation: "localstorage",
			useRefreshTokens: true
		}),
		AngularMaterialModule
	],
	providers: [],
	exports: [],
	bootstrap: [AppComponent] // list on the components that should be known too angular to check and render
})
export class AppModule {}
