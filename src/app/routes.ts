import { Routes } from '@angular/router';
import {ProductListComponent} from "./features/pages/products/product-list/product-list.component";
import {ProductDetailComponent} from "./features/pages/products/product-detail/product-detail.component";
import {CartListComponent} from "./features/pages/cart/cart-list/cart-list.component";
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
        component: CartListComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];

export default routeConfig;
