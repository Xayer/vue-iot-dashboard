<template>
	<div>
		<select v-model="value">
			<option
				v-for="option in options"
				v-text="option.text"
				:key="`${option.text}:${option.value}`"
				:value="option.value"
			></option>
		</select>
	</div>
</template>
<script lang="ts">
import {
	Vue, Component, Prop, Model,
} from 'vue-property-decorator';
@Component({
})
export default class Select extends Vue {
	@Prop() options!: { text: string; value: string}[];

	@Model('input') readonly value!: string;
}
</script>
