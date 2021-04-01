<template>
	<div id="app">
		<navigation>
			<Button class="btn toggle" @click="toggleIntegrations">=</Button>
		</navigation>
		<transition name="slide-fade">
			<integrations v-if="integrationsShown"></integrations>
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
	integrationsShown: boolean = false;

	created() {
		if (localStorage.integrationsBar) {
			this.integrationsShown = localStorage.integrationsBar;
		}
	}

	@Watch('integrationsShown')
	// eslint-disable-next-line class-methods-use-this
	integrationsDisplayChange(isShown: boolean) {
		if (isShown) {
			localStorage.integrationsBar = isShown;
		} else {
			localStorage.removeItem('integrationsBar');
		}
	}

	toggleIntegrations() {
		this.integrationsShown = !this.integrationsShown;
	}
}
</script>

<style lang="scss">
:root {
	--bg-color: #f4f5f6;
	--primary: #445eee;
	--danger: #ee4444;
	--muted: #a4aabc;
	--radius: 20px;
	--padding: 15px;
	--white: #fff;
	--black: #000;
	--text-color: #333;
	@media (prefers-color-scheme: dark) {
		--bg-color: #263238;
		--text-color: var(--white);
	}

}

body, html {
	padding: 0;
	margin: 0;
	// DARK MODE BABY
	background-color: var(--bg-color);
	color: var(--text-color);
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}


/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
	transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .3s;
}
.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(25%);
	opacity: 0;
}
</style>
