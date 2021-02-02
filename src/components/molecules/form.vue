<template>
	<form v-if="settings">
		<div v-for="(settingValue, settingName) in settings" :key="`${settingName}:${settingValue}`">
			{{ settingName }}:
			<FormInput name="input" />
		</div>
		<Button>Save</Button>
	</form>
</template>
<script lang="ts">
import {
	Component, Vue, Model,
} from 'vue-property-decorator';
import { Button } from '@/components/atoms';
import { FormInput } from '@/components/molecules';
@Component({
	components: {
		FormInput,
		Button,
	},
})
export default class Form extends Vue {
	@Model('input') readonly settings!: WidgetSetting[];
}
</script>
