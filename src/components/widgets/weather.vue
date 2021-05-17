<template>
	<div v-if="weatherData">
		<h3>{{ weatherData.name }} <span v-if="weatherData.main">{{ weatherData.main.temp }}</span> - {{ weatherDescriptions }}</h3>
		<h4 v-if="weatherData.main">min {{ weatherData.main.temp_min }} - max {{ weatherData.main.temp_max }}</h4>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { currentWeather } from '@/modules/apis/weather';

@Component
export default class WeatherWidget extends Vue {
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
		this.weatherData = await currentWeather(this.settings.city, this.settings.units);
	}

	get weatherDescriptions() {
		if(!this.weatherData || !this.weatherData.weather) {
			return '';
		}
		return this.weatherData.weather.map(weatherItem => weatherItem.main).join(', ');
	}
}
</script>
<style lang="scss" scoped>
	div {
		display: grid;
		height: 100%;
		align-items: center;
		justify-items: center;
		h1 {
			margin: 0;
			padding: 0;
		}
	}
</style>
