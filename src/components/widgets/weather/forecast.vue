<template>
	<div class="wrapper" v-if="weatherData">
        <h2 v-if="weatherData.city && showTitle">{{ weatherData.city.name }}</h2>
        <div class="forecasts" :class="layout" v-if="weatherData.list">
            <div class="day" v-for="(forecastDate, forecastDateIndex) in weatherData.list" :key="forecastDate.date.toString()">
				<div class="icon-temp">
					<i :class="`icon bi bi-${weatherIcon(forecastDate.weather)}`"></i>
					<span class="temp" v-if="forecastDate.main">{{ Math.round(forecastDate.main.temp) }}{{ temperatureUnit }}</span>
				</div>

				<div class="day-date">
					<h4 @click.prevent="selectedDayIndex = forecastDateIndex;" class="day-name">{{ forecastDate.date.toLocaleString('default', { weekday: 'long' }) }}</h4>
					<span class="date">{{ forecastDate.date.toLocaleString('default', { month: 'long', day: 'numeric'} ) }}</span>
				</div>
            </div>
        </div>
		<div v-if="selectedDay">
			<h4 class="date">{{ selectedDay.date.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' }) }}</h4>
			<div class="timestamps">
				<div class="timestamp" v-for="hourlyForecast in selectedDay.hours" :key="hourlyForecast.dt">
					<div class="forecast" v-if="hourlyForecast.main">
						<b class="time">{{ hourlyForecast.date.toLocaleTimeString([], {hour: '2-digit'}) }}:</b>
						<span class="temp" v-if="hourlyForecast.main">{{ Math.round(hourlyForecast.main.temp) }} {{ temperatureUnit }}</span>
						<i :class="`weather-icon bi bi-${weatherIcon(hourlyForecast.weather)}`"></i>
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

	@Prop() private dimensions!: WidgetDimensions;

	selectedDayIndex: number | null = null;

	weatherData?: mappedForecasts | null = null;

	// eslint-disable-next-line class-methods-use-this
	async mounted() {
		const response = await forecast(this.settings.city, this.settings.units);
		this.weatherData = response;
	}

	get temperatureUnit() {
		return this.settings.units === 'metric' ? '°' : '°F';
	}

	get layout() {
		const { w, h} = this.dimensions;
		return !(w === h) && (w > 3 || w % h === 0) ? 'columns' : 'rows';
	}

	get showTitle() {
		const { w, h} = this.dimensions;
		return h >= 3 || w >= 3;
	}

	// eslint-disable-next-line class-methods-use-this
	weatherIcon(weather: { main: string}[]) {
		return weather ? getWeatherIcon(weather[0].main) : '';
	}

	get selectedDay() {
		if(this.selectedDayIndex === null || !this.weatherData) {
			return null;
		}

		return this.weatherData.list[this.selectedDayIndex];
	}
}
</script>
<style lang="scss" scoped>
	.wrapper {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
        flex-direction: column;
	}

	.forecasts {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		&.columns {
			display: flex;
			justify-content: center;
			align-items: center;
			.day {
				height: 100%;
				width: 75%;
				padding: 0 2%;
				text-align: center;
				box-shadow: inset -1px 0px 0px var(--bg-color), 1px 0px 0px var(--bg-color);
				&:last-of-type {
					box-shadow: none;
				}
				.icon-temp {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.icon {
						font-size: 64px;
						margin: 0;
					}
					.temp {
						font-size: 32px;
						margin-left: 12px;
					}
				}
			}
		}
		&.rows {
			flex-direction: column;
			height: 100%;
			.day {
				display: grid;
				grid-template-columns: 70px 1fr;
				justify-content: space-between;
				align-items: center;
				gap: calc(var(--app-padding));
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				box-shadow: inset 0px -1px 0px var(--bg-color);
				&:last-of-type {
					box-shadow: none;
				}
				.date {
					text-align: left;
				}
				.day-name {
					flex-grow: 1;
					text-transform: capitalize;
				}
				.temp {
					font-weight: bold;
				}
				.icon-temp {
					display: flex;
					justify-content: space-between;
					font-size: 23px;
					text-align: right;
				}
				.day-date {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
