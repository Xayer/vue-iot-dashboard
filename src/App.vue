<template>
	<div id="app" :class="{ 'menu-open': menuShown }">
		<header>
			<Button @click="toggleMenu">=</Button>
			<h1 class="page-title"><portal-target name="page-title" /></h1>
			<portal-target name="page-actions" />
		</header>
		<transition name="slide-fade">
			<navigation v-show="menuShown" />
		</transition>
		<router-view :key="this.$router.currentRoute.fullPath"></router-view>
	</div>
</template>

<script lang="ts">
import { PortalTarget } from 'portal-vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Button } from '@/components/atoms';
import Navigation from '@/components/navbar.vue';
import Integrations from '@/components/integrations/index.vue';

@Component({
	components: {
		Navigation,
		Integrations,
		Button,
		PortalTarget,
	},
	computed: {
		...mapGetters({
			theme: 'themes/theme',
		})
	}
})
export default class App extends Vue {
	menuShown: boolean = false;

	created() {
		let theme : string | null = localStorage.getItem('theme') || null;
		if(theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
		this.$store.dispatch('themes/setTheme', theme);

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
	.dark {
		// DARK MODE BABY
		--bg-color: #263238;
		--text-color: var(--white);
		--bg-alt: #2f3d44;
	}
	.red {
		--bg-color: #475c7a;
		--text-color: var(--white);
		--bg-alt: #685d79;
	}
	.green {
		--bg-color: #305f72;
		--text-color: var(--white);
		--bg-alt: #568ea6;
	}
	.tornado {
		--bg-color: #292929;
		--primary: #c0184d;
		--secondary: #5a9f9e;
		--text-color: var(--white);
		--bg-alt: #232323;
	}
	--bg-color: #f5f5f7;
	--bg-alt: #ffffff;
	--primary: #445eee;
	--danger: #ee4444;
	--warning: #ff7300;
	--success: #04d442;
	--info: #00a2ff;
	--secondary: #a4aabc;
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
	--transition-global: all .3s ease;
	--navbar-transition: var(--transition-global);
	--navbar-width: 60px;
	--navbar-margin: var(--padding) var(--padding);
	--app-padding: 15px;
	--box-shadow-general: 0px 0px 25px -5px;
	--button-box-shadow: var(--box-shadow-general);
	--input-box-shadow: var(--box-shadow-general);
	--input-bg: var(--bg-color);
	--input-text-color: var(--text-color);
	--link-color: #3e798b;

}

body, html {
	--navbar-bg: var(--bg-alt);
	--widget-bg: var(--bg-alt);
	padding: 0;
	margin: 0;
	background-color: var(--bg-color);
	color: var(--text-color);
	font-family: var(--font-base);
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 400;
	min-height: 100vh;
}

a {
	color: var(--link-color);
}

h1, h2, h3, h4, h5, h6 {
	font-family: var(--font-display);
	font-weight: 600;
	margin: 0;
	padding: 0;
}

#app {
	margin-left: 0;
	transition: var(--navbar-transition);
	width: 100%;
	padding: 0 var(--app-padding);
	box-sizing: border-box;
	&.menu-open {
		margin-left: calc(var(--navbar-width));
		width: calc(100% - var(--navbar-width));
	}

	header {
		padding-top: var(--app-padding);
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1;
		align-items: center;
		.page-title {
			margin-inline-start: var(--app-padding);
		}
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

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
	transition: var(--transition-global);
	opacity: 1;
}
.fade-leave-active {
	transition: var(--transition-global);
	display: none;
	opacity: 0 !important;
}
.fade-leave-to {
	display: none;
	opacity: 0 !important;
	height: 0 !important;
}
.fade-enter, .slide-fade-leave-to {
	opacity: 0;
}

.vue-grid-layout {
	margin-left: calc(var(--app-padding) - var(--app-padding) * 2);
	margin-right: calc(var(--app-padding) - var(--app-padding) * 2);
}

.m {
	&-r {
		margin-right: var(--padding);
	}
	&-l {
		margin-left: var(--padding);
	}
	&-b {
		margin-bottom: var(--padding);
	}
	&-t {
		margin-top: var(--padding);
	}
	&-0 {
		margin: 0;
	}
}
</style>
