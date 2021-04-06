<template>
	<select v-model="selectedValue">
		<option
			v-for="option in options"
			v-text="option.text"
			:key="`${option.text}:${option.value}`"
			:value="option.value"
			:disabled="option.disabled || false"
		></option>
	</select>
</template>
<script lang="ts">
import {
	Vue, Component, Prop, VModel,
} from 'vue-property-decorator';

@Component({
})
export default class Select extends Vue {
	@Prop() options!: { text: string; value: string}[];

	@VModel() readonly selectedValue!: string;
}
</script>
<style lang="scss" scoped>
	select {
		border: 1px solid var(--muted);
		border-radius: var(--radius);
		padding: calc(var(--padding) * 0.75) calc(var(--padding) * 1.5);
		transition: var(--transition-global);
		background-color: var(--input-bg);
		color: var(--input-text-color);
		&:focus {
			outline: none;
			box-shadow: var(--primary) var(--input-box-shadow);
		}
	}
</style>
