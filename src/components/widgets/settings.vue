<template>
	<div></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class WidgetSettingEditor extends Vue {
	@Prop() private settings!: WidgetSetting[];
}
</script>
