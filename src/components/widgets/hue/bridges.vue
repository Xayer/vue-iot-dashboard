<template>
	<div v-if="devices">
		<hue-light
			:light="light"
			:hue-id="lightid"
			v-for="(light, lightid) in devices.lights"
			:key="lightid"
		/>
	</div>
	<p v-else>No Hue Light connection</p>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { mapGetters } from 'vuex';
import HueLight from '@/components/widgets/hue/HueLight.vue';
@Component({
	components: { HueLight },
	computed: {
		...mapGetters({
			devices: 'hue/devices',
		}),
	},
})
export default class HueBridges extends Vue {
	@Prop() private settings!: string;

	// eslint-disable-next-line class-methods-use-this
	created() {
		this.$store.dispatch('hue/getDevices');
	}
}
</script>

<style lang="scss" scoped>
	div {
		display: inline-grid;
		height: 100%;
		width: 100%;
		flex-direction: column;
	}

	.error {
		padding: 5px 7px;
		margin: 0;
		background-color: darken(#853838, 25);
		color: #853838;
	}
</style>
