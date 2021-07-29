export const jwtBaseEndpoint = process.env.VUE_APP_SETTINGS_ENDPOINT || "SETTINGS_ENDPOINT_NOT_SET";
export const configBaseUrl = `${jwtBaseEndpoint}wp-json/`;
export const jwtEndpoint = `${configBaseUrl}jwt-auth/v1`;
export const jwtTokenEndpoint = `${jwtEndpoint}/token`;
export const jwtValidateEndpoint = `${jwtEndpoint}/token/validate`;

export const jwtTokenStorageKey = "settings_token";
