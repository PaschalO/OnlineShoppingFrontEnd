/*
 * Holds all the environmental variables for development
 * */

import authConfig from "../../../auth_config.json";

const environment = {
	production: false,
	auth: {
		domain: authConfig.domain,
		clientId: authConfig.clientId,
		redirect_uri: authConfig.redirectUriDev,
		audience: authConfig.audience,
		apiKey: authConfig.apiKeydev
	}
};

export default environment;
