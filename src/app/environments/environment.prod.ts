/*
 * Holds all the environmental variables for production
 * */

import authConfig from "../../../auth_config.json";

const environment = {
	production: true,
	auth: {
		domain: authConfig.domain,
		clientId: authConfig.clientId,
		redirect_uri: authConfig.redirectUriProd,
		audience: authConfig.audience,
		apiKey: authConfig.apiKeyProd
	}
};

export default environment;
