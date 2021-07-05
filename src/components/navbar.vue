<template>
	<nav>
		<router-link
			v-for="navItem in items"
			:key="navItem.name"
			:to="navItem"
		>
			<i class="bi" :class="`bi-${navItem.icon}`"></i>
		</router-link>
		<IntegrationsPanel />
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IntegrationsPanel from '@/components/integrations/index.vue';
import { Route } from '@/router';

@Component({
	components: {
		IntegrationsPanel,
	},
})

export default class Navbar extends Vue {
	items: Omit<Route,'hidden'>[] = [];

	get currentRoute() {
		return this.$router.currentRoute;
	}

	created() {
		(this.$router as any).options.routes
			.forEach(({ name, path, hidden, icon }: Route) => {
				if (hidden) {
					return;
				}
				this.items.push({
					name,
					path,
					icon,
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
			&:hover {
				border-bottom: 3px var(--info) solid;
			}
			&.router-link-active,
			&.router-link-exact-active {
				border-bottom: 3px var(--warning) solid;
			}
			border-bottom: 3px transparent solid;
			transition: all .3s ease;
			text-transform: uppercase;
			color: var(--text-color);
			text-decoration: none;
			text-align: left;
			margin: var(--navbar-margin);
			padding: calc(var(--padding) / 2) calc(var(--padding) / 2);
		}
	}
</style>
