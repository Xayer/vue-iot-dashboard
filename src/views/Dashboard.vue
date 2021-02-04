<template>
  <div>
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
			class="widget"
		>
			<component :is="item.type" :settings="item.settings"></component>
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
import { defaultSettings } from '@/constants/dashboard';
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
	defaultSettings = defaultSettings;

	DashboardWidgets: any = null;

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
