<template>
  <div>
    <GridLayout v-if="getDashboardWidgets"
	:layout.sync="DashboardWidgets"
	:cols="defaultSettings.columns"
	:row-height="defaultSettings.columnHeight"
	:is-draggable="true"
	:is-resizable="true"
	:margin="defaultSettings.margin"
	:use-css-transforms="false"
	:responsive="true"
	@layout-updated="saveWidgetLayout"
	>
		<GridItem
			v-for="item in DashboardWidgets"
			:key="item.i"
			:i="item.i"
			:w="item.w"
			:h="item.h"
			:x="item.x"
			:y="item.y"
			class="widget"
		>
			<component :is="item.type" :settings="item"></component>
		</GridItem>
	</GridLayout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueGridLayout from 'vue-grid-layout';
import { Dictionary } from '@/types/dictionary';
import TextWidget from '@/components/widgets/text.vue';
import HueBridges from '@/components/widgets/hue/bridges.vue';
import RejseplanenDeparture from '@/components/widgets/rejseplanen/departure.vue';

@Component({
	components: {
		GridItem: VueGridLayout.GridItem,
		GridLayout: VueGridLayout.GridLayout,
		TextWidget,
		HueBridges,
		RejseplanenDeparture,
	},
})
export default class Dashboard extends Vue {
	defaultSettings: any = {
		columns: {
			lg: 12,
			md: 10,
			sm: 6,
			xs: 4,
			xxs: 2,
		},
		columnHeight: 100,
		margin: [15, 15],
		items: [
			{
				message: 'Foo',
				type: 'TextWidget',
				w: 6,
				h: 1,
				y: 1,
				x: 0,
				i: 0,
			},
			{
				message: 'Bar',
				type: 'HueBridges',
				w: 6,
				h: 1,
				y: 1,
				x: 6,
				i: 1,
			},
			{
				message: 'Departures',
				type: 'RejseplanenDeparture',
				title: 'Work',
				parameters: {
					stationId: '461682600',
				},
				w: 6,
				h: 1,
				y: 2,
				x: 6,
				i: 2,
			},
			{
				message: 'Departures',
				title: 'Home',
				type: 'RejseplanenDeparture',
				parameters: {
					stationId: '461097000',
				},
				w: 6,
				h: 3,
				y: 3,
				x: 6,
				i: 3,
			},
		],
	}

	DashboardWidgets: any = null;

	created() {
		this.DashboardWidgets = this.getDashboardWidgets();
	}

	// eslint-disable-next-line class-methods-use-this
	getDashboardWidgets() {
		let widgets;
		if (localStorage.widgets) {
			const parsedWidgets = JSON.parse(localStorage.widgets);
			if (typeof parsedWidgets === 'object') {
				widgets = parsedWidgets;
			}
		} else {
			widgets = this.defaultSettings.items;
		}
		return widgets;
	}

	// eslint-disable-next-line class-methods-use-this
	saveWidgetLayout(layout: Array<Object>) {
		localStorage.widgets = JSON.stringify(layout);
	}
}
</script>
<style lang="scss">
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
