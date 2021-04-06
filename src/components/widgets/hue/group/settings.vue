<template>
	<form @submit.stop.prevent="">
        <label for="hueGroup">Hue Group
            <Select class="form-field" :value="group" :options="options" name="hueGroup"
                @input="updateValue('group', $event)" />
        </label>
    </form>
</template>
<script lang="ts">
import {
	Component, Vue, VModel, Prop, Watch,
} from 'vue-property-decorator';
import { Select } from '@/components/atoms';
import { mapGetters } from 'vuex';
import { Devices as HueDevices } from '@/types/hue';

@Component({
	components: {
		Select,
	},
	computed: {
		...mapGetters({
			devices: 'hue/devices',
			token: 'hue/token',
			hueAvailable: 'hue/available',
		}),
	},
})
export default class HueGroupSettings extends Vue {
    devices!: HueDevices;

    group = '';

	@VModel() readonly settings!: WidgetSetting[];

	@Prop() title!: string;

	get groupFromSettings() {
		if (!this.settings) {
			return '';
		}
		const settingIndex: number = Object.keys(this.settings).findIndex((setting) => setting === 'group');
		if (settingIndex > -1) {
			return this.settings[settingIndex] as unknown as string;
		}
		return null;
	}

	get options() {
    	if (!this.devices.groups) {
    		return [];
    	}
    	return Object.values(this.devices.groups).map((lightGroup) => ({
    		text: lightGroup.name,
    		value: lightGroup.name,
    	}));
	}

	mounted() {
		if (this.groupFromSettings) {
			this.group = this.groupFromSettings;
		}
	}

    @Watch('options')
	setDefaultValueBasedOnOptions() {
		if(this.group === '' && this.options[0]) {
			// eslint-disable-next-line no-unused-expressions
			this.group = this.options[0].value;
		}
	}

    updateValue(key: string, value: any) {
    	this.$emit('input', { ...this.settings, [key]: value });
    }
}
</script>