<template>
	<WidgetWrapper>
		<span class="drag">[+]</span>
		<span class="remove" @click="$emit('removeWidget')">X</span>
		{{ title }}
		<div v-for="(settingValue, settingName) in settings" :key="`${settingName}:${settingValue}`">
			{{ settingName }}:
			<FormInput :value="settings[settingName]"
				@input="updateValue(settingName, $event)" />
		</div>
	</WidgetWrapper>
</template>
<script lang="ts">
import {
	Component, Vue, VModel, Prop,
} from 'vue-property-decorator';
import { FormInput } from '@/components/molecules';
import WidgetWrapper from '@/components/widgets/widget.vue';

@Component({
	components: {
		FormInput,
		WidgetWrapper,
	},
})
export default class WidgetSettingEditor extends Vue {
	@VModel() readonly settings!: WidgetSetting[];

	@Prop() title!: string;

	updateValue(key: string, value: any) {
		this.$emit('input', { ...this.settings, [key]: value });
	}
}
</script>
