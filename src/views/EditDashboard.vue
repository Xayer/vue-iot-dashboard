<template>
  <div>
	<portal to="page-title">Edit Dashboard</portal>
	<portal to="page-actions">
		<span class="error" v-show="errorMessage">{{ errorMessage }}</span>
		<Select :options="widgetOptions" v-model="selectedWidget" />
		<Button class="m-l" @click="addWidget">Add Widget</Button>
		<Button class="primary m-l" @click="saveWidgetLayout">Save Dashboard</Button>
	</portal>
    <GridLayout v-if="DashboardWidgets"
		:layout.sync="DashboardWidgets"
		:cols="defaultSettings.columns"
		:row-height="defaultSettings.columnHeight"
		:is-draggable="true"
		:is-resizable="true"
		:margin="defaultSettings.margin"
		:use-css-transforms="true"
		:responsive="true"
	>
		<GridItem
			v-for="(item, itemIndex) in DashboardWidgets"
			:key="`${item.i}${item.guid}`"
			:i="item.i"
			:w="item.w"
			:h="item.h"
			:x="item.x"
			:y="item.y"
			:dragAllowFrom="'.drag'"
		>
			<span class="debug">x: {{ item.x }} y: {{ item.y }} w: {{ item.w }} h: {{ item.h }}</span>
			<WidgetSettings
				:title="item.type"
				v-model="DashboardWidgets[itemIndex].settings"
				@removeWidget="removeWidget(itemIndex)"
			/>
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
			if (parsedWidgets && typeof parsedWidgets === 'object') {
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
		const maxXCoords = Math.max(
			...this.DashboardWidgets.map((widget: Widget) => widget.x),
			0,
		);
		const maxYCoords = Math.max(
			...this.DashboardWidgets.map((widget: Widget) => widget.y),
			0,
		);

		console.log(maxXCoords, maxYCoords);
		this.DashboardWidgets.push({
			...widgetSettings,
			i: this.DashboardWidgets.length,
			guid: new Date().toUTCString,
			x: 0,
			y: maxYCoords ? maxYCoords + 1 : 0,
		});
	}

	// eslint-disable-next-line class-methods-use-this
	saveWidgetLayout() {
		localStorage.widgets = JSON.stringify(this.DashboardWidgets);
	}

	removeWidget(widgetIndex: number) {
		this.DashboardWidgets.splice(widgetIndex, 1);
	}
}
</script>
<style lang="scss">
	.error {
		color: red;
	}
	.debug {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
		color: var(--muted);
	}
</style>
