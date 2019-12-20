import HueAPI from '@/modules/apis/hue';
import { Devices } from '@/types/hue';

const API = new HueAPI();

export default {
	state: {
		devices: {},
		available: false,
	},

	getters: {
		devices: (state:any) => state.devices,
		token: (state: any) => API.findExistingToken(),
		available: (state: any) => state.available,
	},

	actions: {
		getDevices: (
			{ commit, dispatch }: { commit: any, dispatch: any },
		) => new Promise(async (resolve, reject) => {
			try {
				await API.getDevices().then((value: unknown) => {
					commit('SET_AVAILABILITY', true);
					commit('SET_DEVICES', value);
					resolve();
				}).catch((error: Error) => {
					if (error.message === 'Network Error') {
						commit('SET_AVAILABILITY', false);
						commit('SET_DEVICES', []);
					}
					reject(error);
				});
			} catch (error) {
				reject(error);
			}
		}),
		registerToken: (
			{ commit, dispatch }: { commit: any, dispatch: any },
		) => new Promise(async (resolve, reject) => {
			await API.registerToken().then(() => {
				commit('REFRESH_TOKEN');
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		toggleLight: (
			{ commit, dispatch }: { commit: any, dispatch: any },
			{ uniqueId, on, colour }: { uniqueId: string, on: boolean, colour?: Array<number> },
		) => new Promise(async (resolve, reject) => {
			await API.toggleLight(uniqueId, on, colour).then(() => {
				dispatch('getDevices').then(() => {
					resolve();
				}).catch((error: Error) => {
					reject(error);
				});
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		turnLightOn: (
			{ commit, dispatch }: { commit: any, dispatch: any },
			uniqueId: string,
		) => new Promise(async (resolve, reject) => {
			await API.lightOn(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		turnLightOff: (
			{ commit, dispatch }: { commit: any, dispatch: any },
			uniqueId: string,
		) => new Promise(async (resolve, reject) => {
			await API.lightOff(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
	},

	mutations: {
		SET_DEVICES: (state: any, devices: any) => {
			state.devices = devices;
		},
		REFRESH_TOKEN: (state: any) => {
			state.token = API.findExistingToken();
		},
		SET_AVAILABILITY: (state: any, available: boolean) => {
			state.available = available;
		},
	},
};
