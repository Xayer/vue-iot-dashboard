import axios, { AxiosResponse } from "axios";
import { Commit, Dispatch } from "vuex";
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
import { SettingsResponse } from "@/types/settings";
import { storageKey as spotifyStorageKey } from "@/modules/apis/spotify";

export default {
	state: {
		isAuthenticated: false,
		userId: null,
		userName: null,
	},

	getters: {
		isAuthenticated: (state: any) => state.isAuthenticated,
	},

	actions: {
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
		update: ({ commit, dispatch }: { commit: Commit; dispatch: Dispatch }) => {
			let existingSettings = {};
			dispatch("fetch").then((response: AxiosResponse<SettingsResponse>) => {
				const { settings } = response.data.meta;
				existingSettings = settings;
			});
			const settings = {
				...existingSettings,
				boards: [
					{
						name: "Dashboard",
						widgets: `${localStorage.getItem(widgetsLocalStorageKey)}`,
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
			axios
				.post(
					settingsEndpoint,
					{
						meta: {
							settings,
						},
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(jwtTokenStorageKey)}`,
						},
					}
				)
				.then((response) => {
					console.log(response);
				})
				.catch((response) => {
					console.error(response);
				});
		},
	},

	mutations: {
		SET_IS_AUTHENTICATED: (state: { isAuthenticated: Boolean }, isAuthenticated: boolean) => {
			state.isAuthenticated = isAuthenticated;
		},
		SET_USER_DATA: (
			state: { userId: number; userName: string },
			{ userId, userName }: { userName: string; userId: number }
		) => {
			state.userId = userId;
			state.userName = userName;
		},
	},
};
