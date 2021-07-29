import axios from "axios";
import { Commit, Dispatch } from "vuex";
import { jwtTokenStorageKey, jwtValidateEndpoint, jwtTokenEndpoint } from "@/constants/settings";

export default {
	state: {
		isAuthenticated: false,
	},

	getters: {
		isAuthenticated: (state: any) => state.isAuthenticated,
	},

	actions: {
		validate: ({ commit }: { commit: Commit }) => {
			if (localStorage.getItem(jwtTokenStorageKey)) {
				const token = localStorage.getItem(jwtTokenStorageKey);
				console.log(token);
				axios
					.post(
						jwtValidateEndpoint,
						{},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem(jwtTokenStorageKey)}`,
							},
						}
					)
					.then(() => {
						commit("SET_IS_AUTHENTICATED", true);
					})
					.catch(() => {
						commit("SET_IS_AUTHENTICATED", false);
					});
			} else {
				commit("SET_IS_AUTHENTICATED", false);
			}
		},

		authenticate: (
			{ commit, dispatch }: { commit: Commit; dispatch: Dispatch },
			{ username, password }: { username: string; password: string }
		) => {
			const formdata = new FormData();
			formdata.append("username", username);
			formdata.append("password", password);
			axios
				.post(jwtTokenEndpoint, formdata)
				.then((response) => {
					const {
						data: { token },
					} = response;
					commit("SET_IS_AUTHENTICATED", true);
					localStorage.setItem(jwtTokenStorageKey, token);
					dispatch("validate");
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
	},
};
