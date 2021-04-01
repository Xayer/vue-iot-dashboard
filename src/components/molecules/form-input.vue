<template>
	<div>
		<component
			:is="settingType"
			v-model="setting"
		/>
	</div>
</template>
<script lang="ts">
import { Vue, Component, VModel } from 'vue-property-decorator';
import { Input, Select } from '@/components/atoms';

@Component({
	components: {
		Input,
		Select,
	},
})
export default class FormInput extends Vue {
	@VModel() readonly setting!: WidgetSetting;

	// eslint-disable-next-line class-methods-use-this
	get settingType() {
		if (typeof this.setting === 'object') {
			return 'Select';
		}
		return 'Input';
	}
}
</script>
