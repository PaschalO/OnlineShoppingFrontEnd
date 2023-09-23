import { Routes } from '@angular/router';
import {ProductListComponent} from "./features/pages/products/product-list/product-list.component";
import {ProductDetailComponent} from "./features/pages/products/product-detail/product-detail.component";
import {CartComponent} from "./features/pages/cart/cart/cart.component";
import {CheckoutComponent} from "./features/pages/checkout/checkout/checkout.component";

const routeConfig: Routes = [
    {
        path: '',
        component: ProductListComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];

export default routeConfig;
