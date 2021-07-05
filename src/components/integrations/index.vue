<template>
	<div class="integrations">
		<hue />
		<network />
		<spotify />
		<themes />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hue from '@/components/integrations/hue.vue';
import Network from '@/components/integrations/internet.vue';
import Spotify from '@/components/integrations/spotify.vue';
import Themes from '@/components/integrations/themes.vue';

@Component({
	components: {
		Hue,
		Network,
		Spotify,
		Themes,
	},
})
export default class Integrations extends Vue {
}
</script>

<style lang="scss" scoped>
	.integrations {
		display: flex;
		justify-content: flex-start;
		gap: 10px;
		margin: var(--navbar-margin);
		padding: calc(var(--padding) / 2) calc(var(--padding) / 2);
	}
</style>
