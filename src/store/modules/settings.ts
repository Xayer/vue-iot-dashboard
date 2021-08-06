import axios, { AxiosResponse } from "axios";
import { Commit, Dispatch, Getter, GetterTree } from "vuex";
import {
	jwtTokenStorageKey,
	jwtValidateEndpoint,
	jwtTokenEndpoint,
	settingsEndpoint,
	jwtInvalidateEndpoint,
	menuShownStorageKey,
	themeStorageKey,
} from "@/constants/settings";
import { widgetsLocalStorageKey } from "@/constants/widgets";
import { SettingsResponse, UserSettings } from "@/types/settings";
import { storageKey as spotifyStorageKey } from "@/modules/apis/spotify";

type StateType = {
	isAuthenticated: boolean,
	userId: number | null,
	userName: string | null,
	userSettings: UserSettings,
}

const SettingsState: StateType = {
	isAuthenticated: false,
	userId: null,
	userName: null,
	userSettings: {
		boards: [],
		settings: []
	}
};

const SettingsGetters = {
	isAuthenticated: (state: StateType) => state.isAuthenticated,
	settings: (state: StateType ) => ({
		boards: [
			{
				name: "Dashboard",
				widgets: localStorage.getItem(JSON.parse(widgetsLocalStorageKey)),
			},
		],
		settings: [
			{
				key: menuShownStorageKey,
				value: localStorage.getItem(JSON.parse(menuShownStorageKey)) || true,
			},
			{
				key: themeStorageKey,
				value: localStorage.getItem(JSON.parse(themeStorageKey)) || true,
			},
			{
				key: spotifyStorageKey,
				value: localStorage.getItem(JSON.parse(spotifyStorageKey)) || true,
			},
		],
	}),
};

const actions = {
	validate: ({ commit }: { commit: Commit }) => {
		if (localStorage.getItem(jwtTokenStorageKey)) {
			const token = localStorage.getItem(jwtTokenStorageKey);
			axios
				.post(
					jwtValidateEndpoint,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then(() => {
					commit("SET_IS_AUTHENTICATED", true);
				})
				.catch(() => {
					commit("SET_IS_AUTHENTICATED", false);
					localStorage.removeItem(jwtTokenStorageKey);
				});
		} else {
			commit("SET_IS_AUTHENTICATED", false);
			localStorage.removeItem(jwtTokenStorageKey);
		}
	},
	authenticate: (
		{ commit, dispatch }: { commit: Commit; dispatch: Dispatch },
		{ username, password }: { username: string; password: string }
	) => {
		const formdata = new FormData();
		formdata.append("username", username);
		formdata.append("password", password);
		axios.post(jwtTokenEndpoint, formdata).then((response) => {
			const {
				data: { token },
			} = response;
			localStorage.setItem(jwtTokenStorageKey, token);
			commit("SET_IS_AUTHENTICATED", true);
			dispatch("userInfo");
		});
	},
	signOut: ({ commit }: { commit: Commit }) => {
		if (localStorage.getItem(jwtTokenStorageKey)) {
			const token = localStorage.getItem(jwtTokenStorageKey);
			axios
				.delete(jwtInvalidateEndpoint, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					commit("SET_IS_AUTHENTICATED", false);
				})
				.catch(() => {
					commit("SET_IS_AUTHENTICATED", false);
				});
		} else {
			commit("SET_IS_AUTHENTICATED", false);
			localStorage.removeItem(jwtTokenStorageKey);
		}
	},
	download: async ({
		commit,
		dispatch,
	}: {
		commit: Commit;
		dispatch: Dispatch;
	}) => {
		await dispatch("fetch").then(({ data: { meta: { settings }}}: AxiosResponse<SettingsResponse>) => {
			commit('SET_SETTINGS', settings);
		});
	},
	fetch: ({
		commit,
		dispatch,
	}: {
		commit: Commit;
		dispatch: Dispatch;
	}): Promise<AxiosResponse<SettingsResponse>> =>
		axios.get(settingsEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(jwtTokenStorageKey)}`,
			},
		}),
	upload: async ({ commit, dispatch, getters }: { commit: Commit; dispatch: Dispatch, getters: GetterTree<StateType, typeof SettingsGetters> }) => {
		let existingSettings = {};
		dispatch("fetch").then((response: AxiosResponse<SettingsResponse>) => {
			const { settings } = response.data.meta;
			existingSettings = settings;
		});

		const localSettings = {
			boards: [
				{
					name: "Dashboard",
					widgets: localStorage.getItem(widgetsLocalStorageKey),
				},
			],
			settings: [
				{
					key: menuShownStorageKey,
					value: localStorage.getItem(menuShownStorageKey) || true,
				},
				{
					key: themeStorageKey,
					value: localStorage.getItem(themeStorageKey) || true,
				},
				{
					key: spotifyStorageKey,
					value: localStorage.getItem(spotifyStorageKey) || true,
				},
			],
		};
			
		await axios.post(
			settingsEndpoint,
			{
				meta: {
					settings: {
						...existingSettings,
						...localSettings,
					},
				},
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem(jwtTokenStorageKey)}`,
				},
			}
		)
			.then(({ data: { meta: { settings }}}: AxiosResponse<SettingsResponse>) => {
				commit('SET_SETTINGS', settings);
			})
			.catch((response) => {
				console.error(response);
			});
	},
};

const mutations = {
	SET_IS_AUTHENTICATED: (state: StateType, isAuthenticated: boolean) => {
		state.isAuthenticated = isAuthenticated;
	},
	SET_USER_DATA: (
		state: StateType,
		{ userId, userName }: { userName: string; userId: number }
	) => {
		state.userId = userId;
		state.userName = userName;
	},
	SET_SETTINGS: (
		state: StateType,
		newSettings: UserSettings,
	) => {
		const { boards, settings} = newSettings;
		// TODO: change to have multiple boards, rather than just saving the widgets of the first board
		localStorage.setItem(widgetsLocalStorageKey, boards[0].widgets);
		settings.forEach(({ key, value}) => {
			localStorage.setItem(key, value);
		});
	}
};

export default {
	state: SettingsState,
	getters: SettingsGetters,
	actions,
	mutations,
};
