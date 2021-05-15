import querystring from 'querystring';

const corsBypass = 'https://cors-anywhere.herokuapp.com';
const host = 'http://api.openweathermap.org';
const version: string = '2.5';
const baseUrl: string = `${corsBypass}/${host}/data/${version}`;
const token: string = 'f7307576b27dd288a84c60daa3a4dcec';
const CURRENT_WEATHER_ENDPOINT = `${baseUrl}/weather`;

export const currentWeather = async (city: string) => {
	console.log();
	const response = await fetch(`${CURRENT_WEATHER_ENDPOINT}/?${
		querystring.stringify({
			q: city,
			appid: token,
		})
	}`);
	response.json();
}
