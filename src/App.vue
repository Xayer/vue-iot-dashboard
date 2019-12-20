<template>
	<div id="app">
		<navigation></navigation>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/navbar.vue';

@Component({
	components: {
		Navigation,
	},
})
export default class App extends Vue {

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
</style>
