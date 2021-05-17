import querystring from 'querystring';

const corsBypass = 'https://cors-anywhere.herokuapp.com';
const host = 'https://api.openweathermap.org';
const version: string = '2.5';
// const baseUrl: string = `${corsBypass}/${host}/data/${version}`;
const baseUrl: string = `${host}/data/${version}`;
const token: string = 'f7307576b27dd288a84c60daa3a4dcec';
const CURRENT_WEATHER_ENDPOINT = `${baseUrl}/weather`;

export const currentWeather = async (city: string, units: string = 'metric') => {
	const response = await fetch(`${CURRENT_WEATHER_ENDPOINT}/?${
		querystring.stringify({
			q: city,
			appid: token,
			units,
		})
	}`);
	return response.json();
}
