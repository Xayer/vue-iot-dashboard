<template>
	<div>
		<iframe :src="departureBoardUrl" frameborder="0"></iframe>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RejseplanenDeparture extends Vue {
	@Prop() private settings!: {
		parameters: {
			stationId: string;
		}
	};

	get departureBoardUrl() {
		return `http://www.rejseplanen.dk/bin/help.exe/mn?L=vs_tus.vs_new&tpl=monitor&station=${this.settings.parameters.stationId}&display=horizontal`;
	}
}
</script>
<style lang="scss" scoped>
	div {
		margin: 0;
		padding: 0;
		display: block;
		height: 100%;
		overflow: hidden;
	}

	iframe {
		height: inherit;
		width: 100%;
	}
</style>
