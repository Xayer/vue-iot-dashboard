<template>
	<form @submit.stop.prevent="">
		<div
			v-for="(settingValue, settingName) in settings"
			:key="`${settingName}:${settingValue}`"
		>
			<label :for="settingName">{{ settingName }}:
				<FormInput class="form-field" :value="settings[settingName]" :name="settingName"
					@input="updateValue(settingName, $event)" />
			</label>
		</div>
	</form>
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
<style lang="scss">
	.vue-grid-item {
		& > .vue-resizable-handle {
			/* Styling from .bi-arrow-down-right */
			&::before {
				content: "\f123";
				display: inline-block;
				font-family: bootstrap-icons !important;
				font-style: normal;
				font-weight: normal !important;
				font-variant: normal;
				text-transform: none;
				line-height: 1;
				vertical-align: -.125em;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
			position: absolute;
			bottom: var(--padding);
			right: var(--padding);
			/** reset of the original styling from framework */
			padding: 0;
			background: none;
		}

		.vue-resizable-handle, .drag, .remove {
			color: #fff;
			font-size: 20px;
		}
	}
	.settings-header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1fr;
		justify-content: center;
		align-items: center;
	}
	form {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		label {
			display: flex;
			align-items: center;
		}
		.form-field {
			margin-left: var(--padding);
		}
	}
</style>
