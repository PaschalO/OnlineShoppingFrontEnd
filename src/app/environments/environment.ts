import authConfig from "../../../auth_config.json";

const environment = {
	production: false,
	auth: {
		domain: authConfig.domain,
		clientId: authConfig.clientId,
		redirect_uri: authConfig.redirect_uri,
		audience: authConfig.audience
	}
};

export default environment;
