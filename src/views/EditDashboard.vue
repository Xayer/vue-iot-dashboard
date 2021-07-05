<template>
  <div>
	<portal to="page-title">Edit Dashboard</portal>
	<portal to="page-actions">
		<Button class="m-r m-b" @click="viewDashboard" key="view-dashboard">View Dashboard</Button>
		<span class="error m-b" v-show="errorMessage" key="dashboardErrors">{{ errorMessage }}</span>
		<Select class="m-b"
			:options="widgetOptions"
			v-model="selectedWidget"
			key="selectDashboardWidgets" />
		<Button class="m-l m-b" @click="addWidget" key="addWidget">Add Widget</Button>
		<Button class="primary m-l m-b"
			@click="saveWidgetLayout"
			key="saveDashboard">Save Dashboard</Button>
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
			:min-w="item.minW || 1"
			:min-h="item.minH || 1"
			:max-w="item.maxW || Infinity"
			:max-h="item.maxH || Infinity"
			:dragAllowFrom="'.drag'"
		>
			<span class="debug">x: {{ item.x }} y: {{ item.y }} w: {{ item.w }} h: {{ item.h }}</span>
			<WidgetWrapper>
				<div class="settings-header m-b">
					<span class="drag m-r"><i class="bi bi-arrows-move"></i></span>
					<h2>{{ item.type }}</h2>
					<span class="remove m-l" @click="removeWidget(itemIndex)">
						<i class="bi bi-x-circle"></i>
					</span>
				</div>
				<component :is="widgetSettingsComponent(item.type)"
					v-model="DashboardWidgets[itemIndex].settings"
				/>
			</WidgetWrapper>
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
import HueGroupSettings from '@/components/widgets/hue/group/settings.vue';
import WeatherSettings from '@/components/widgets/weather/settings.vue';
import { WidgetDefaultSettings, WidgetsAvailable } from '@/constants/widgets';
import { defaultSettings } from '@/constants/dashboard';
import WidgetWrapper from '@/components/widgets/widget.vue';

@Component({
	components: {
		GridItem: VueGridLayout.GridItem,
		GridLayout: VueGridLayout.GridLayout,
		WidgetSettings,
		Select,
		Button,
		Weather: WeatherSettings,
		HueGroup: HueGroupSettings,
		WidgetWrapper,
		Forecast: WeatherSettings,
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

		const newSettings = {
			...widgetSettings,
			i: Date.now(),
			guid: Date.now(),
			x: 0,
			y: maxYCoords ? maxYCoords + 1 : 0,
		};
		this.DashboardWidgets.push(newSettings);
	}

	// eslint-disable-next-line class-methods-use-this
	saveWidgetLayout() {
		localStorage.widgets = JSON.stringify(this.DashboardWidgets);
	}

	removeWidget(widgetIndex: number) {
		this.DashboardWidgets.splice(widgetIndex, 1);
	}

	viewDashboard() {
		this.$router.push({
			name: 'dashboard',
			params: {
				id: this.$route.params.id,
			},
		});
	}
	
	widgetSettingsComponent(widget: string) {
		if (this.$options.components && Object.keys(this!.$options!.components).includes(widget)) {
			return widget;
		}
		return 'WidgetSettings';
		
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
