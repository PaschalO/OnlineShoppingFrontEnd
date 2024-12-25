/*
 * Holds all the environmental variables for production
 * */

import authConfig from "../../../auth_config.json";

const environment = {
	production: true,
	auth: {
		domain: authConfig.domain,
		clientId: authConfig.clientId,
		redirect_uri:
			"https://angular-shopping-v1.s3.ca-central-1.amazonaws.com/index.html",
		audience: authConfig.audience,
		apiKey: "https://onlineshopping-dev.eba-ky2j4zcc.ca-central-1.elasticbeanstalk.com/products"
	}
};

export default environment;
