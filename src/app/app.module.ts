import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsModule } from "./features/pages/products/products.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule} from "./authentication/authentication.module";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { CartModule } from "./features/pages/cart/cart.module";
import { SharedModule } from "./shared/shared.module";
import { HeadersModule } from "./shared/component/headers/headers.module";
import { CheckoutModule } from "./features/pages/checkout/checkout.module";

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
        CheckoutModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent] // list on the components that should be known too angular to check and render
})
export class AppModule { }
