<template>
  <div>
	<Button @click.native="saveWidgetLayout">Save Dashboard</Button>
	<span class="error" v-show="errorMessage">{{ errorMessage }}</span>
	<Select :options="widgetOptions" v-model="selectedWidget" />
	<Button @click.native="addWidget">Add Widget</Button>
    <GridLayout v-if="DashboardWidgets"
		:layout.sync="DashboardWidgets"
		:cols="defaultSettings.columns"
		:row-height="defaultSettings.columnHeight"
		:is-draggable="true"
		:is-resizable="true"
		:margin="defaultSettings.margin"
		:use-css-transforms="false"
		:responsive="true"
	>
		<GridItem
			v-for="item in DashboardWidgets"
			:key="item.i"
			:i="item.i"
			:w="item.w"
			:h="item.h"
			:x="item.x"
			:y="item.y"
		>
			<WidgetSettings v-model="item.settings"></WidgetSettings>
		</GridItem>
	</GridLayout>
	<p v-else>No Widgets added yet. Select a widget from the dropdown and click "Add Widget".</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueGridLayout from 'vue-grid-layout';
import { Select, Button } from '@/components/atoms';
import WidgetSettings from '@/components/widgets/settings.vue';
import { WidgetDefaultSettings, WidgetsAvailable } from '@/constants/widgets';
import { defaultSettings } from '@/constants/dashboard';

@Component({
	components: {
		GridItem: VueGridLayout.GridItem,
		GridLayout: VueGridLayout.GridLayout,
		WidgetSettings,
		Select,
		Button,
	},
})
export default class EditableDashboard extends Vue {
	defaultSettings = defaultSettings;

	errorMessage = '';

	selectedWidget: string = WidgetsAvailable.TextWidget.toString();

	DashboardWidgets: any = null;

	widgetOptions = Object.values(WidgetsAvailable).map(widget => ({
		text: widget,
		value: widget,
	}));

	created() {
		this.DashboardWidgets = this.getDashboardWidgets();
	}

	// eslint-disable-next-line class-methods-use-this
	getDashboardWidgets() {
		let widgets = [];
		if (localStorage.widgets) {
			const parsedWidgets = JSON.parse(localStorage.widgets);
			if (typeof parsedWidgets === 'object') {
				widgets = parsedWidgets;
			}
		}
		return widgets;
	}

	addWidget() {
		if (!WidgetDefaultSettings[this.selectedWidget]) {
			this.errorMessage = 'Widget doesn\'t have any default settings';
			return;
		}
		const widgetSettings = WidgetDefaultSettings[this.selectedWidget];
		widgetSettings.i = this.DashboardWidgets.length;
		this.DashboardWidgets.push(widgetSettings);
	}

	// eslint-disable-next-line class-methods-use-this
	saveWidgetLayout(layout: Array<Object>) {
		localStorage.widgets = JSON.stringify(layout);
	}
}
</script>
<style lang="scss">
	.error {
		color: red;
	}
	.vue-grid-item>.vue-resizable-handle {
		background: none;
		width: 15px;
		height: 15px;
		padding: 0;
		margin: {
			block-end: 0.35rem;
			inline-end: 0.35rem;
		};
		border: {
			block-end: 0.125rem;
			block-start: 0;
			inline-start: 0;
			inline-end: 0.125rem;
			color: #eee;
			style: solid;
		}
	}

	.vue-grid-item {
		background-color: #2d3b42;
		padding: 15px;
		box-sizing: border-box;
	}
</style>
