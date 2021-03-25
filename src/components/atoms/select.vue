<template>
	<div>
		<select v-model="selectedValue">
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
	Vue, Component, Prop, VModel,
} from 'vue-property-decorator';
@Component({
})
export default class Select extends Vue {
	@Prop() options!: { text: string; value: string}[];

	@VModel() readonly selectedValue!: string;
}
</script>
