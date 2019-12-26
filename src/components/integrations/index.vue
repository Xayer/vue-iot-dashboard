<template>
	<aside>
		<h2>Integrations</h2>
		<nav>
			<hue></hue>
			<internet></internet>
		</nav>
	</aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hue from '@/components/integrations/hue.vue';
import Internet from '@/components/integrations/internet.vue';

@Component({
	components: {
		Hue,
		Internet,
	},
})
export default class Navbar extends Vue {
	items: Array<{name: string, path: string}> = [];

	menuActive: boolean = false;

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
	aside {
		background-color: darken(#2d3b42,1.25);
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		min-width: 15vw;
		flex-direction: column;
		height: 100vh;
		z-index: 1;
		align-items: center;
		nav { align-items: flex-start; text-align: left; }
		div {
			padding: {
				block-start: 0.5rem;
				inline-start: 2rem;
				inline-end: 2rem;
				block-end: 0.5rem;
			}
		}
	}
</style>
