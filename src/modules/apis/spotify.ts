import querystring from 'querystring';

export const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
export const clientSecret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;
export const redirectUri = `${window.location.origin}/integrations/spotify`;
export const storageKey = 'spotify-refresh-token';
export const integrationActiveStorageKey = 'integration-spotify-active'

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const authenticateToken = async (code: string) => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: querystring.stringify({
			grant_type: 'authorization_code',
			code,
			redirect_uri: redirectUri,
		})
	});
	return response.json();
}

export const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token: localStorage.getItem(storageKey)
		})
	});

	return response.json();
};

export const getTopTracks = async () => {
	const { access_token: accessToken } = await getAccessToken();

	const response = await fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
   
	return response.json();
};