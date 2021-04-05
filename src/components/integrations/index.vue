<template>
	<div class="integrations">
		<hue />
		<network />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hue from '@/components/integrations/hue.vue';
import Network from '@/components/integrations/internet.vue';

@Component({
	components: {
		Hue,
		Network,
	},
})
export default class Integrations extends Vue {
}
</script>

<style lang="scss" scoped>
	.integrations {
		display: flex;
		justify-content: flex-start;
		margin: var(--navbar-margin);
		padding: calc(var(--padding) / 2) calc(var(--padding) / 2);
	}
</style>
