<template>
	<div>
		<component :is="settingType" v-model="value" />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Model } from 'vue-property-decorator';
import { Input, Select } from '@/components/atoms';
@Component({
	components: {
		Input,
		Select,
	},
})
export default class FormInput extends Vue {
	@Model('input') readonly value!: WidgetSetting[];

	get settingType() {
		if (typeof this.value === 'object') {
			return 'Select';
		}
		return 'Input';
	}
}
</script>
