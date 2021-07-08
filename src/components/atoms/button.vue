<template>
	<button class="btn" @click="emitClick"><slot /></button>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Button extends Vue {
	emitClick(event: any) {
		this.$emit('click', event);
	}
}
</script>
<style lang="scss" scoped>
	.btn {
		.toggle {
			z-index: 9999;
		}
		border: 0;
		border-radius: var(--radius);
		padding: calc(var(--padding) * 0.75) calc(var(--padding) * 1.5);
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		// MUTED
		background-color: var(--secondary);
		box-shadow: var(--secondary) var(--button-box-shadow);
		color: var(--button-text-color);
		&.primary {
			background-color: var(--primary);
			box-shadow: var(--primary) var(--button-box-shadow);
			color: var(--button-text-color);
		}
		&.danger {
			background-color: var(--danger);
			box-shadow: var(--danger) var(--button-box-shadow);
			color: var(--button-text-color);
		}
	}
</style>
