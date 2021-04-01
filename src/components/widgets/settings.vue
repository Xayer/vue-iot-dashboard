<template>
	<WidgetWrapper>
		<span class="drag">[+]</span>
		<span class="remove" @click="$emit('removeWidget')">X</span>
		<h2>{{ title }}</h2>
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
<style lang="scss">
	.vue-grid-item {
		& > .vue-resizable-handle {
			background: none;
			width: 15px;
			height: 15px;
			padding: 0;
			border: {
				block-end: 0.125rem;
				block-start: 0;
				inline-start: 0;
				inline-end: 0.125rem;
				color: #eee;
				style: solid;
			}
		}
		.drag {
			position: absolute;
			top: 0;
			left: 0;
		}
		.remove {
			position: absolute;
			top: 0;
			right: 0;
			cursor: pointer;
		}

		.vue-resizable-handle, .drag, .remove {
			margin: 0.35rem;
			color: #fff;
		}
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
