<template>
  <div>
	<portal to="page-title">Dashboard</portal>
	<portal to="page-actions">
		<Button @click="editDashboard" class="primary m-b">Edit</Button>
	</portal>
    <GridLayout v-if="getDashboardWidgets"
	:layout.sync="DashboardWidgets"
	:cols="defaultSettings.columns"
	:row-height="defaultSettings.columnHeight"
	:is-draggable="false"
	:is-resizable="false"
	:margin="defaultSettings.margin"
	:use-css-transforms="true"
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
			:min-w="item.minW || 1"
			:min-h="item.minH || 1"
			:max-w="item.maxW || Infinity"
			:max-h="item.maxH || Infinity"
		>
			<WidgetWrapper>
				<component :is="item.type" :settings="item.settings" :dimensions="{w: item.w, h: item.h }"></component>
			</WidgetWrapper>
		</GridItem>
	</GridLayout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueGridLayout from 'vue-grid-layout';
import TextWidget from '@/components/widgets/text.vue';
import WidgetWrapper from '@/components/widgets/widget.vue';
import HueBridges from '@/components/widgets/hue/bridges.vue';
import HueLight from '@/components/widgets/hue/light.vue';
import HueGroup from '@/components/widgets/hue/group/group.vue';
import RejseplanenDeparture from '@/components/widgets/rejseplanen/departure.vue';
import { defaultSettings } from '@/constants/dashboard';
import { Button } from '@/components/atoms';
import TodoList from '@/components/widgets/todo.vue';
import Weather from '@/components/widgets/weather/weather.vue';
import ForecastWidget from '@/components/widgets/weather/forecast.vue';
import { widgetsLocalStorageKey } from '@/constants/widgets';

@Component({
	components: {
		GridItem: VueGridLayout.GridItem,
		GridLayout: VueGridLayout.GridLayout,
		TextWidget,
		HueBridges,
		HueLight,
		HueGroup,
		RejseplanenDeparture,
		WidgetWrapper,
		Button,
		TodoList,
		Weather,
		Forecast: ForecastWidget,
	},
})
export default class Dashboard extends Vue {
	defaultSettings = defaultSettings;

	DashboardWidgets: any = null;

	created() {
		this.DashboardWidgets = this.getDashboardWidgets();
	}

	// eslint-disable-next-line class-methods-use-this
	getDashboardWidgets() {
		let widgets = [];
		if (localStorage.getItem(widgetsLocalStorageKey)) {
			const parsedWidgets = JSON.parse(localStorage.getItem(widgetsLocalStorageKey) || '');
			if (typeof parsedWidgets === 'object') {
				widgets = parsedWidgets;
				widgets.map((widget: Widget) => {
					const widgetData = { ...widget };
					if (!widget.guid) {
						widgetData.guid = new Date().toUTCString();
					}
					return widgetData;
				});
			}
		}
		return widgets;
	}

	editDashboard() {
		this.$router.push({
			name: 'dashboard-edit',
			params: {
				id: this.$route.params.id,
			},
		});
	}
}
</script>
