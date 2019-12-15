<template>
	<nav>
		<router-link
			v-for="navItem in items"
			:key="navItem.name"
			:to="navItem"
			v-text="navItem.name"
		></router-link>
		<hue></hue>
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hue from '@/components/integrations/hue.vue';

@Component({ components: { Hue } })
export default class App extends Vue {
	items: Array<{name: string, path: string}> = [];

	get currentRoute() {
		return this.$router.currentRoute;
	}

	created() {
		(this.$router as any).options.routes.forEach((route: {name: string, path: string}) => {
			this.items.push({
				name: route.name,
				path: route.path,
			});
		});
	}
}
</script>

<style lang="scss">
	nav {
		display: flex;
		background-color: #2d3b42;
		padding-inline-start: 15px;
		padding-inline-end: 15px;
		a {
			&.router-link-active {
				border-bottom: 3px #ff7300 solid;
			}
			text-transform: capitalize;
			color: #eee;
			text-decoration: none;
			padding-block-start: 0.5rem;
			padding-block-end: 0.5rem;
			padding-inline-start: 0.5rem;
			padding-inline-end: 0.5rem;
		}
	}
</style>
