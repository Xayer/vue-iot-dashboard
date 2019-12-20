<template>
	<div>
		Weather
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import WeatherAPI from '@/modules/apis/weather';

@Component
export default class TextWidget extends Vue {
	@Prop() private settings!: string;

	weatherApiInstance!: WeatherAPI;

	created() {
		this.weatherApiInstance = new WeatherAPI();
		console.log(this.weatherApiInstance.currentWeather('Odense'));
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
