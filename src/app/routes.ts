import { Routes } from "@angular/router";

const routeConfig: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "/products" },
	{
		path: "admin",
		loadChildren: () =>
			import("./admin/admin.module").then((a) => a.AdminModule)
	},
	{
		path: "products",
		loadChildren: () =>
			import("./features/pages/products/products.module").then(
				(p) => p.ProductsModule
			)
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
			)
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
		redirectTo: "products"
	}
];

export default routeConfig;
