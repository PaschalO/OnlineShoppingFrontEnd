import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsModule } from "./features/pages/products/products.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule} from "./authentication/authentication.module";
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { CartModule } from "./features/pages/cart/cart.module";
import { SharedModule } from "./shared/shared.module";
import { HeadersModule } from "./shared/component/headers/headers.module";
import { CheckoutModule } from "./features/pages/checkout/checkout.module";
import  { ConfirmationPageModule } from "./features/pages/confirmation-page/confirmation-page.module";
import { AuthModule } from "@auth0/auth0-angular";
import {AngularMaterialModule} from "./angularMaterial/angularMaterial.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
	imports: [
		BrowserModule,
		ProductsModule,
		CartModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule,
		AuthenticationModule,
		RouterOutlet,
		AppRoutingModule,
		HeadersModule,
		ConfirmationPageModule,
		CheckoutModule,
		AuthModule.forRoot({
			domain: 'dev-bgg57gfmuzsxtfzv.us.auth0.com',
			clientId: 'yGWRMFzb1urZSYiGUjhZNXDO2OHoz7L0',
			authorizationParams: {
				redirect_uri: window.location.origin
			}
		}),
		AngularMaterialModule
	],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent] // list on the components that should be known too angular to check and render
})

export class AppModule { }
