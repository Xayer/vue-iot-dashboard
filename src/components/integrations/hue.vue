<template>
	<div>
		<span><i :class="token && online ? 'on': 'off'">&#9679;</i> Hue</span>
		<section v-if="token">
			<span v-if="devices && devices.lights">{{ lightLabel }} Lights</span>
		</section>
		<button v-else @click="registerToken()">Request Access</button>
		<span class="error" v-if="errorMessage" v-text="errorMessage"></span>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { mapGetters } from 'vuex';
import HueAPI from '@/modules/apis/hue';
@Component({
	computed: {
		...mapGetters({
			devices: 'hue/devices',
			token: 'hue/token',
			online: 'internet/online',
		}),
	},
})
export default class HueIntegration extends Vue {
	token!: string;

	devices!: {
		lights: Object,
	};

	errorMessage: string = '';

	// eslint-disable-next-line class-methods-use-this
	created() {
		this.$store.dispatch('hue/getDevices');
	}

	registerToken() {
		if (this.token) {
			return;
		}

		// eslint-disable-next-line no-alert
		alert('go to your Hue Bridge and click the link button (circle). When you have done that, click okay.');
		this.$store.dispatch('hue/registerToken').then(() => {
			this.errorMessage = '';
			this.$forceUpdate();
		}).catch((error: any) => {
			this.errorMessage = error.description;
		});
	}

	get lightLabel() {
		return this.devices && this.devices.lights ? Object.keys(this.devices.lights).length : 'No';
	}
}
</script>

<style lang="scss" scoped>
	div {
		display: inline-flex;
		background-color: darken(#2d3b42,1.25);
		padding: 0.5rem;
		flex-direction: row;
		align-items: center;
		span {
			margin-inline-start: 0.25rem;
		}
		section {
			margin-block: {
				start: 0.125rem / 2;
				end: 0.125rem / 2;
			}
			margin-inline-start: 0.5rem;
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
</style>