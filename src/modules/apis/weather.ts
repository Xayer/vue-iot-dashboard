import querystring from "querystring";
import { ForecastsResponse, ForecastsOnDate } from '@/types/weather';

const corsBypass = "https://cors-anywhere.herokuapp.com";
const host = "https://api.openweathermap.org";
const version: string = "2.5";
// const baseUrl: string = `${corsBypass}/${host}/data/${version}`;
const baseUrl: string = `${host}/data/${version}`;
const token: string = "f7307576b27dd288a84c60daa3a4dcec";
const CURRENT_WEATHER_ENDPOINT = `${baseUrl}/weather`;
const FORECAST_ENDPOINT = `${baseUrl}/forecast`;

export const currentWeather = async (city: string, units: string = "metric") => {
	const response = await fetch(
		`${CURRENT_WEATHER_ENDPOINT}/?${querystring.stringify({
			q: city,
			appid: token,
			units,
		})}`
	);
	return response.json();
};

export const forecast = async (city: string, units: string = "metric") => {
	const response = await fetch(
		`${FORECAST_ENDPOINT}/?${querystring.stringify({
			q: city,
			appid: token,
			units,
		})}`
	);
	const responseData: ForecastsResponse = await response.json();
	return {
		...responseData,
		list: responseData.list ? responseData.list.reduce((acc: { [key: string]: ForecastsOnDate; }, currentForecast) => {
			const timestamp = new Date(currentForecast.dt_txt);
			const forecastKey = `${timestamp.getFullYear()}-${timestamp.getMonth()}-${timestamp.getDate()}`;
			
			if(!acc[forecastKey]) {
				acc[forecastKey] = {
					...currentForecast,
					date: timestamp, hours: []
				}
			};
			// if the current temp is larger than the existing one, replace the data - we want to see the warmest part of the day! :D
			if (currentForecast.main.temp > acc[forecastKey].main.temp ) {
				acc[forecastKey] = {
					...acc[forecastKey],
					...currentForecast,
				}
			}
			acc[forecastKey].hours = [
				...acc[forecastKey].hours,
				{
					...currentForecast,
					date: timestamp,
				}
			]

			return acc;
		}, {}) : [],
	};
};
