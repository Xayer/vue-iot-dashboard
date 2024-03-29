export const jwtBaseEndpoint = process.env.VUE_APP_SETTINGS_ENDPOINT || "SETTINGS_ENDPOINT_NOT_SET";
export const configBaseUrl = `${jwtBaseEndpoint}wp-json/`;
export const jwtEndpoint = `${configBaseUrl}jwt-auth/v1`;
export const jwtTokenEndpoint = `${jwtEndpoint}/token`;
export const jwtValidateEndpoint = `${jwtEndpoint}/token/validate`;

export const jwtInvalidateEndpoint = `${jwtEndpoint}/token/invalidate`;

export const settingsEndpoint = `${configBaseUrl}wp/v2/users/me`;

export const jwtTokenStorageKey = "settings_token";

export const menuShownStorageKey = "menuShown";

export const themeStorageKey = "theme";

export const userInfoStorageKey = 'user-info';