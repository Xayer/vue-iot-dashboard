import API from './client';

const protocol: string = 'http://';
const { host } = (window.location as any);
const baseUrl: string = '/weather-api/data';
const version: string = '2.5';
const token: string = 'f7307576b27dd288a84c60daa3a4dcec';

export default class WeatherAPI extends API {
	constructor() {
		super({
			protocol,
			host,
			baseURL: baseUrl,
			version,
		});
	}

	currentWeather(city: string) {
		this.get('weather', {
			q: city,
			appid: token,
		});
	}
}
