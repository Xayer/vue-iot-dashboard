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

@Component({
	components: {
		GridItem: VueGridLayout.GridItem,
		GridLayout: VueGridLayout.GridLayout,
		TextWidget,
		HueBridges,
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
		],
	}

	DashboardWidgets: any = null;

	created() {
		this.DashboardWidgets = this.getDashboardWidgets();
	}

	// eslint-disable-next-line class-methods-use-this
	getDashboardWidgets() {
		return localStorage.widgets ? JSON.parse(localStorage.widgets) : this.defaultSettings.items;
	}

	// eslint-disable-next-line class-methods-use-this
	saveWidgetLayout(layout) {
		localStorage.widgets = JSON.stringify(layout);
		console.log(layout);
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
