<template>
	<div class="wrapper" v-if="weatherData">
        <h1 v-if="weatherData.city">{{ weatherData.city.name }}</h1>
        <div class="forecasts">
            <div class="forecast" v-for="forecast in weatherData.list" :key="forecast.dt_txt">
                <div class="temps" v-if="forecast.main">
                    <div class="min-max">
                        <h2 v-if="forecast.main">{{ forecast.main.temp }}{{ temperatureUnit }}</h2>
                        <span>min {{ forecast.main.temp_min }}{{ temperatureUnit }}</span>
                        <span>max {{ forecast.main.temp_max }}{{ temperatureUnit }}</span>
                    </div>
                </div>
                <h3>{{ weatherDescriptions(forecast.weather) }}</h3>
            </div>
        </div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { forecast } from '@/modules/apis/weather';

@Component
export default class ForecastWidget extends Vue {
	@Prop() private settings!: { city: string; units: string; };

	weatherData: {
		main?: {
			// eslint-disable-next-line camelcase
			temp: number; temp_min: number; temp_max: number;
		};
		weather?: {
			main: string; description: string}[]
	} = {};

	// eslint-disable-next-line class-methods-use-this
	async mounted() {
		this.weatherData = await forecast(this.settings.city, this.settings.units);
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
    }
	.forecast {
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
