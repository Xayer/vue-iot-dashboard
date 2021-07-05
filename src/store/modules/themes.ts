import { Commit } from 'vuex';

interface State {
	theme: string;
	themes: { name: string; icon: string; }[];
}

export interface Theme {
	name: string;
	icon: string;
}

export default {
	state: {
		theme: 'light',
		themes: [
			{ name: 'dark', icon: 'moon' },
			{ name: 'light', icon: 'sun' },
			{ name: 'red', icon: 'star' },
			{ name: 'green', icon: 'tree' },
		]
	} as State,

	getters: {
		theme: (state: State) => {
			const foundTheme = state.themes.find((theme) => theme.name === state.theme);
			return foundTheme || '';
		},
		themes: (state:State) => state.themes,
	},

	actions: {
		setTheme: ({
			commit
		}: { commit: Commit }, theme: string) => {
			commit('SET_THEME', theme);
		}
	},

	mutations: {
		SET_THEME: (state: State, theme: string) => {
			state.theme = theme;
			localStorage.setItem('theme', theme);
		},
	},
};
