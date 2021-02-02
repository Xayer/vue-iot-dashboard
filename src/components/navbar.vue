<template>
	<nav>
		<router-link
			v-for="navItem in items"
			:key="navItem.name"
			:to="navItem"
			v-text="navItem.name"
		></router-link>
		<slot></slot>
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Navbar extends Vue {
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

<style lang="scss" scoped>
	nav {
		background-color: #2d3b42;
		width: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		a {
			&:hover {
				background-color: rgba(invert($color: #ff7300), .125);
			}
			&.router-link-exact-active {
				border-bottom: 3px #ff7300 solid;
				background-color: rgba(#ff7300, 0.25);
			}
			border-bottom: 3px transparent solid;
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
