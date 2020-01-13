import HueAPI from '@/modules/apis/hue';
import { Devices } from '@/types/hue';

export default {
	state: {
		devices: {},
		available: false,
		api: false,
	},

	getters: {
		devices: (state:any) => state.devices,
		token: (state: any) => { return state.api ? state.api.findExistingToken() : ''; },
		available: (state: any) => state.available,
		instance: (state: any) => state.api,
	},

	actions: {
		getDevices: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
		) => new Promise(async (resolve, reject) => {
			try {
				await rootGetters.instance.getDevices().then((value: unknown) => {
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
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
		) => new Promise(async (resolve, reject) => {
			await rootGetters.instance.registerToken().then(() => {
				commit('REFRESH_TOKEN');
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		toggleLight: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
			{ uniqueId, on, colour }: { uniqueId: string, on: boolean, colour?: Array<number> },
		) => new Promise(async (resolve, reject) => {
			await rootGetters.instance.toggleLight(uniqueId, on, colour).then(() => {
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
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
			uniqueId: string,
		) => new Promise(async (resolve, reject) => {
			await rootGetters.instance.lightOn(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		turnLightOff: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
			uniqueId: string,
		) => new Promise(async (resolve, reject) => {
			await rootGetters.instance.lightOff(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
	},

	mutations: {
		SET_BRIDGE_ADDRESS: (state: any, address: string) => {
			state.api = new HueAPI(address);
			localStorage.bridge_address = address;
		},
		SET_DEVICES: (state: any, devices: any) => {
			state.devices = devices;
		},
		REFRESH_TOKEN: (state: any) => {
			state.token = state.api.findExistingToken();
		},
		SET_AVAILABILITY: (state: any, available: boolean) => {
			state.available = available;
		},
	},
};
