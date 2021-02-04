<template>
	<div>
		<Button class="remove" @click="$emit('removeWidget')">X</Button>
		{{ title }}
		<div v-for="(settingValue, settingName) in settings" :key="`${settingName}:${settingValue}`">
			{{ settingName }}:
			<!-- <FormInput v-model="settings[settingName]" /> -->
			<FormInput :value="settings[settingName]"
				@input="updateValue(settingName, $event.target.value)" />
		</div>
	</div>
</template>
<script lang="ts">
import {
	Component, Vue, VModel, Prop,
} from 'vue-property-decorator';
import { FormInput } from '@/components/molecules';
@Component({
	components: {
		FormInput,
	},
})
export default class WidgetSettingEditor extends Vue {
	@VModel() readonly settings!: WidgetSetting[];

	@Prop() title!: string;

	updateValue(key: string, value: string) {
		this.$emit('input', { ...this.settings, [key]: value });
	}
}
</script>
