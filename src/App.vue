<template>
	<div id="app" :class="{ 'menu-open': menuShown }">
		<Button @click="toggleMenu">Show Menu</Button>
		<transition name="slide-fade">
			<navigation v-if="menuShown" />
		</transition>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Button } from '@/components/atoms';
import Navigation from '@/components/navbar.vue';
import Integrations from '@/components/integrations/index.vue';

@Component({
	components: {
		Navigation,
		Integrations,
		Button,
	},
})
export default class App extends Vue {
	menuShown: boolean = false;

	created() {
		if (localStorage.menuShown) {
			this.menuShown = localStorage.menuShown;
		}
	}

	@Watch('menuShown')
	// eslint-disable-next-line class-methods-use-this
	integrationsDisplayChange(isShown: boolean) {
		if (isShown) {
			localStorage.menuShown = isShown;
		} else {
			localStorage.removeItem('menuShown');
		}
	}

	toggleMenu() {
		this.menuShown = !this.menuShown;
	}
}
</script>

<style lang="scss">
:root {
	--bg-color: #f4f5f6;
	--primary: #445eee;
	--danger: #ee4444;
	--warning: #ff7300;
	--success: #04d442;
	--info: #00a2ff;
	--muted: #a4aabc;
	--radius: 20px;
	--padding: 15px;
	--white: #fff;
	--black: #000;
	--text-color: #444;
	--widget-bg: var(--white);
	--font-base: 'Work Sans', sans-serif;
	--font-display: 'Poppins', sans-serif;
	--button-text-color: var(--white);
	--navbar-bg: var(--white);
	--navbar-transition: all .3s ease;
	--navbar-width: 15vw;
	@media (prefers-color-scheme: dark) {
		// --bg-color: #263238;
		// --text-color: var(--white);
		// --dark-bg-alt: #2f3d44;
		// --navbar-bg: var(--dark-bg-alt);
		// --widget-bg: var(--dark-bg-alt);
	}

}

body, html {
	padding: 0;
	margin: 0;
	// DARK MODE BABY
	background-color: var(--bg-color);
	color: var(--text-color);
	font-family: var(--font-base);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
	font-family: var(--font-display);
}

#app {
	margin-left: 0;
	transition: var(--navbar-transition);
	width: 100%;
	&.menu-open {
		margin-left: calc(var(--navbar-width) + 15px);
		width: calc(100% - var(--navbar-width) - 15px);
	}
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
	transition: var(--navbar-transition);
}
.slide-fade-leave-active {
	transition: var(--navbar-transition);
}
.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(-var(--navbar-width));
	opacity: 0;
}
</style>
