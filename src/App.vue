<template>
	<div id="app">
		<navigation>
			<button class="btn" @click="toggleIntegrations">=</button>
		</navigation>
		<transition name="slide-fade">
			<integrations v-if="integrationsShown"></integrations>
		</transition>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Navigation from '@/components/navbar.vue';
import Integrations from '@/components/integrations/index.vue';

@Component({
	components: {
		Navigation,
		Integrations,
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
body, html { padding: 0; margin: 0; background-color: #263238; color: #bbbbbb; }
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

.btn {
	margin: {
		inline-start: 0.5rem;
		inline-end: 0.5rem;
	}
	padding: 0.25rem 0.5rem;
	background-color: transparent;
	border-style: solid !important;
	border: 2px solid #007acc;
	color: #007acc !important;
	box-shadow: 0px 0px 3px #007acc, inset 0px 0px 3px #007acc;
	color: #bbbbbb;
	&.btn-danger {
		border-color: red;
		color: red !important;
		box-shadow: 0px 0px 3px red, inset 0px 0px 3px red;
	}
}
</style>
