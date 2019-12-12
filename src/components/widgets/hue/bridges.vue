<template>
	<div>
		<p class="error" v-if="errorMessage" v-text="errorMessage"></p>
		<section v-if="hasToken">
			<pre v-if="devices">{{ devices }}</pre>
		</section>
		<button v-else @click="getToken">Request Access</button>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import HueAPI from '@/modules/apis/hue';
@Component({})
export default class HueBridges extends Vue {
  @Prop() private settings!: string;

	API!: any;

	token!: string;

	errorMessage: string = '';

	devices: any = {};

	// eslint-disable-next-line class-methods-use-this
	created() {
		this.API = new HueAPI();
		if (this.hasToken) {
			this.API.getDevices().then((response: AxiosResponse) => {
				this.devices = response.data;
			});
		}
	}

	getToken() {
		if (this.token) {
			return;
		}

		// eslint-disable-next-line no-alert
		alert('go to your Hue Bridge and click the link button (circle). When you have done that, click okay.');
		this.API.registerToken().then((token: string) => {
			this.errorMessage = '';
		}).catch((error: any) => {
			this.errorMessage = error.description;
		});
	}

	// eslint-disable-next-line class-methods-use-this
	get hasToken() {
		return localStorage.hue;
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

	.error {
		padding: 5px 7px;
		margin: 0;
		background-color: darken(#853838, 25);
		color: #853838;
	}
</style>
