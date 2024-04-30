import { IProduct } from "./product-interface";

export interface ICart extends IProduct {
	quantity: number;
}
