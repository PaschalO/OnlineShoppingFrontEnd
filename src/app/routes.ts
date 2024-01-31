import { Routes } from '@angular/router';
import {ConfirmationPageComponent} from "./features/pages/confirmation-page/confirmation-page.component";

const routeConfig: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/pages/products/products.module').then(p => p.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/pages/cart/cart.module').then(c => c.CartModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/pages/checkout/checkout.module').then(x => x.CheckoutModule)
  },
  {
    path: 'confirmation-page',
    loadChildren: () => import('./features/pages/confirmation-page/confirmation-page.module').then(y => y.ConfirmationPageModule)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
// const routeConfig: Routes = [
//   {
//     path: '',
//     component: ProductListComponent,
//   },
//   {
//     path: 'products/:id',
//     component: ProductDetailComponent,
//   },
//   {
//     path: 'cart',
//     component: CartListComponent
//   },
//   {
//     path: 'checkout',
//     component: CheckoutComponent,
//     // canActivate: [AuthGuard]
//   },
//   {
//     path: 'account/sign-in',
//     component: LogInComponent
//   },
//   {
//     path: 'account/create-an-account',
//     component: SignUpComponent
//   },
//   {
//     path: 'confirmation-page',
//     component: ConfirmationPageComponent
//   }
// ];

export default routeConfig;
