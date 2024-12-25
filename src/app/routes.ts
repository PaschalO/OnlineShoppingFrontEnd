import { Routes } from "@angular/router";
import { AuthGuard } from "@auth0/auth0-angular";

const routeConfig: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "/products" },
	{
		path: "products",
		loadChildren: () =>
			import("./features/pages/products/products.module").then(
				(c) => c.ProductsModule
			)
	},
	{
		path: "admin",
		loadChildren: () =>
			import("./admin/admin.module").then((a) => a.AdminModule),
		canActivate: [AuthGuard]
	},
	{
		path: "cart",
		loadChildren: () =>
			import("./features/pages/cart/cart.module").then(
				(c) => c.CartModule
			)
	},
	{
		path: "checkout",
		loadChildren: () =>
			import("./features/pages/checkout/checkout.module").then(
				(x) => x.CheckoutModule
			),
		canActivate: [AuthGuard]
	},
	{
		path: "confirmation-page",
		loadChildren: () =>
			import(
				"./features/pages/confirmation-page/confirmation-page.module"
			).then((y) => y.ConfirmationPageModule)
	},
	{
		path: "**",
		redirectTo: "/products"
	}
];

export default routeConfig;
