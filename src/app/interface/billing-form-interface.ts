import { ShippingFormInterface } from "./shipping-form-interface";

export interface BillingFormInterface extends ShippingFormInterface {
	card: string;
	expiry: string;
	securityCode: string;
	billingAddress: string;
}
