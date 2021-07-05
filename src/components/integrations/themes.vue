<template>
	<div class="theme" @click="toggleTheme">
		<i class="bi" :class="`bi-${theme.icon}`">{{theme.name}}</i>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Theme } from '@/store/modules/themes';

@Component({
	computed: {
		...mapGetters({
			theme: 'themes/theme',
			availableThemes: 'themes/themes',
		}),
	},
})
export default class ThemesWidget extends Vue {
	availableThemes!: Theme[];

	theme!: Theme;

  	setTheme(theme: string) {
  		this.$store.dispatch('themes/setTheme', theme);
	}

	toggleTheme() {
		const currentTheme = this.availableThemes.findIndex((theme) => theme === this.theme);
		let nextThemeIndex: number = currentTheme + 1;
		if(nextThemeIndex >= this.availableThemes.length) { nextThemeIndex = 0; }
		this.setTheme(this.availableThemes[nextThemeIndex].name);
	}

  	mounted() {
  		this.updateTheme(this.theme);
	}
	  
	@Watch('theme')
  	// eslint-disable-next-line class-methods-use-this
  	updateTheme (theme: Theme) {
  		document.body.className = theme.name;
  	}

}
</script>
<style lang="scss">
	span {
		text-transform: capitalize;
		display: inline-block;
		margin: {
			block-start: 0;
			block-end: 0;
		}
	}
	i {
		display: inline-block;
		margin-inline-end: 0.5rem;
	}
	.on {
		color: var(--success);
	}
	.off {
		color: var(--danger);
	}
</style>
