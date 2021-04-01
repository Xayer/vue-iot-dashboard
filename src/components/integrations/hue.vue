<template>
	<div>
		<span v-if="!bridgeAddress"><input type="text" v-model="bridgeAddress"></span>
		<span>
			<i :class="hueAvailable && online && token ? 'on': 'off'">&#9679;</i>Hue
			<section
				v-if="hueAvailable
				&& token
				&& devices
				&& devices.lights"
			>{{ lightLabel }} Lights</section></span>
		<Button class="danger"
			v-if="!hueAvailable || !token"
			@click="registerToken()"
		>!</Button>
		<span class="loading" v-if="loading">Loading</span>
		<span class="error" v-if="errorMessage" v-text="errorMessage"></span>
	</div>
</template>
<script lang="ts">
import {
	Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { mapGetters } from 'vuex';
import { Button } from '@/components/atoms';

@Component({
	components: {
		Button,
	},
	computed: {
		...mapGetters({
			devices: 'hue/devices',
			token: 'hue/token',
			hueAvailable: 'hue/available',
			online: 'internet/online',
		}),
	},
})
export default class HueIntegration extends Vue {
	token!: string;

	hueAvailable!: boolean;

	loading: boolean = false;

	bridgeAddress: string = '';

	devices!: {
		lights: Object,
	};

	errorMessage: string = '';

	// eslint-disable-next-line class-methods-use-this
	created() {
		if (localStorage.bridge_address) {
			this.bridgeAddress = localStorage.bridge_address;
			this.detectDevices();
		}
		setInterval(() => {
			this.detectDevices();
		}, 3000);
	}

	detectDevices() {
		this.$store.dispatch('hue/getDevices').catch((error: any) => {
			this.errorMessage = error.description;
		});
	}

	@Watch('bridgeAddress')
	commitBridgeAddress(address: string) {
		this.$store.commit('hue/SET_BRIDGE_ADDRESS', address);
		this.detectDevices();
	}

	registerToken() {
		if (this.token) {
			return;
		}
		this.loading = true;
		// eslint-disable-next-line no-alert
		alert('go to your Hue Bridge and click the link button (circle). When you have done that, click okay.');
		this.$store.dispatch('hue/registerToken').then(() => {
			this.errorMessage = '';
			this.$forceUpdate();
			this.loading = false;
		}).catch((error: any) => {
			this.errorMessage = error.description;
			this.loading = false;
		});
	}

	get lightLabel() {
		return this.devices && this.devices.lights ? Object.keys(this.devices.lights).length : 'No';
	}
}
</script>

<style lang="scss" scoped>
	div {
		display: flow-root;
		padding: 0.5rem;
		flex-direction: row;
		text-align: left;
		align-items: center;
		section {
			margin-block: {
				start: 0.25rem;
			}
			display: inline-block;
			padding: 0.125rem 0.5rem;
			background-color: lighten(#2d3b42, 2.5);
			border-radius: 4px;
		}
	}

	.error {
		padding: 5px 7px;
		margin: 0;
		background-color: darken(#853838, 25);
		color: #853838;
	}

	.on { color: green; }
	.off { color: red; }

	input {
		display: block;
	}
</style>
