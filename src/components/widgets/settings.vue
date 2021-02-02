<template>
	<div>
		<Form :settings="settings" />
		<FormInput />
	</div>
</template>
<script lang="ts">
import {
	Component, Vue, Model,
} from 'vue-property-decorator';
import { Form, FormInput } from '@/components/molecules';
@Component({
	components: {
		Form,
		FormInput,
	},
})
export default class WidgetSettingEditor extends Vue {
	@Model('input') readonly settings!: WidgetSetting[];
}
</script>
