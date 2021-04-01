<template>
	<nav>
		<router-link
			v-for="navItem in items"
			:key="navItem.name"
			:to="navItem"
			v-text="navItem.name"
		></router-link>
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
		(this.$router as any).options.routes
			.forEach((route: {name: string, path: string; hidden: boolean}) => {
				if (route.hidden) {
					return;
				}
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
		background: var(--navbar-bg);
		font-family: var(--font-display);
		width: var(--navbar-width);
		z-index: 1;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		justify-content: center;
		overflow: auto;
		box-sizing: border-box;
		flex-direction: column;
		a {
			display: block;
			margin: 10px 20px;
			&:hover {
				border-bottom: 3px var(--info) solid;
			}
			&.router-link-exact-active {
				border-bottom: 3px var(--warning) solid;
			}
			border-bottom: 3px transparent solid;
			transition: all .3s ease;
			text-transform: uppercase;
			color: var(--text-color);
			text-decoration: none;
			text-align: left;
			padding-block-start: 0.5rem;
			padding-block-end: 0.5rem;
			padding-inline-start: 0.5rem;
			padding-inline-end: 0.5rem;
		}
	}
</style>
