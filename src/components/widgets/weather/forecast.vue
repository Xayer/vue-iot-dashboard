<template>
	<div class="wrapper" v-if="weatherData">
        <h1 v-if="weatherData.city">{{ weatherData.city.name }}</h1>
        <div class="forecasts" v-if="weatherData.list">
            <div class="date" v-for="forecastDate in weatherData.list" :key="forecastDate.date.toString()">
				<h4>{{ forecastDate.date.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' }) }}</h4>
				<div class="temps" v-for="hourlyForecast in forecastDate.hours" :key="hourlyForecast.dt">
					<div class="min-max" v-if="hourlyForecast.main">
						<div class="forecast">
							<span class="time">{{ hourlyForecast.date.toLocaleTimeString([], {hour: '2-digit'}) }}</span>
							<b class="temp" v-if="hourlyForecast.main">{{ Math.round(hourlyForecast.main.temp) }}{{ temperatureUnit }}</b>
							<i :class="`weather-icon bi bi-${weatherIcon(hourlyForecast.weather)}`"></i>
						</div>
						<!-- <span v-if="hourlyForecast.main.temp_min">min {{ hourlyForecast.main.temp_min }}{{ temperatureUnit }}</span>
						<span v-if="hourlyForecast.main.temp_max">max {{ hourlyForecast.main.temp_max }}{{ temperatureUnit }}</span> -->
					</div>
				</div>
            </div>
        </div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { forecast } from '@/modules/apis/weather';
import { mappedForecasts } from '@/types/weather';
import { getWeatherIcon } from '@/constants/weather';

@Component
export default class ForecastWidget extends Vue {
	@Prop() private settings!: { city: string; units: string; };

	weatherData?: mappedForecasts | null = null;

	// eslint-disable-next-line class-methods-use-this
	async mounted() {
		const response = await forecast(this.settings.city, this.settings.units);
		this.weatherData = response;
	}

	get temperatureUnit() {
		return this.settings.units === 'metric' ? '°C' : '°F';
	}

	// eslint-disable-next-line class-methods-use-this
	weatherDescriptions(weather: { main: string; }[]) {
		if(!weather) {
			return '';
		}
		return weather.map(weatherItem => weatherItem.main).join(', ');
	}

	// eslint-disable-next-line class-methods-use-this
	weatherIcon(weather: { main: string}[]) {
		return weather ? getWeatherIcon(weather[0].main) : '';
	}
}
</script>
<style lang="scss" scoped>
	.wrapper { display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
        flex-direction: column;
	}
    .forecasts {
        display: flex;
        gap: var(--app-padding);
		overflow: scroll;
		border: 5px solid var(--bg-color);
		.forecast {
			display: flex;
			grid-template-columns: 1fr auto 1fr;
			grid-template-rows: none;
			gap: 10px;
			.weather-icon { margin: 0; text-align: right;}
			.temp, .time {
				text-align: right;
			}
		}
		.date:nth-child(odd) {
			background-color: var(--bg-color);
			padding: 0 10px;
		}
    }
	.forecastDate {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--app-padding);
		.temps {
			height: auto;
			display: flex;
			justify-items: center;
			align-items: center;
			gap: var(--app-padding);
			.min-max {
				height: inherit;
				display: flex;
				flex-direction: column;
				> * {
					display: block;
				}
			}
		}
		h1 {
			margin: 0;
			padding: 0;
		}
	}
</style>
