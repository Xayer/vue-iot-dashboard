import HueAPI from '@/modules/apis/hue';
import { Devices } from '@/types/hue';

export default {
	state: {
		devices: {},
		available: false,
		instance: false,
		token: null,
	},

	getters: {
		hueAdress: () => localStorage.bridge_address,
		devices: (state:any) => state.devices,
		token: (state:any) => state.token,
		available: (state: any) => state.available,
		instance: (state: any) => state.instance,
	},

	actions: {
		getDevices: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
		) => new Promise(async (resolve, reject) => {
			if (!rootGetters['hue/instance']) {
				commit('SET_AVAILABILITY', false);
				commit('SET_DEVICES', []);
				reject(new Error('instance not available'));
			}
			try {
				await rootGetters['hue/instance'].getDevices().then((value: unknown) => {
					commit('SET_AVAILABILITY', true);
					commit('SET_DEVICES', value);
					commit('REFRESH_TOKEN');
					resolve('success');
				}).catch((error: Error) => {
					if (error.message === 'Network Error') {
						commit('SET_AVAILABILITY', false);
						commit('REFRESH_TOKEN');
						commit('SET_DEVICES', []);
					}
					reject(error);
				});
			} catch (error) {
				commit('SET_AVAILABILITY', false);
				commit('REFRESH_TOKEN');
				commit('SET_DEVICES', []);
				reject(error);
			}
		}),
		registerToken: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
		) => new Promise(async (resolve, reject) => {
			await rootGetters['hue/instance'].registerToken().then(() => {
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
			await rootGetters['hue/instance'].toggleLight(uniqueId, on, colour).then(() => {
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
			await rootGetters['hue/instance'].lightOn(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
		turnLightOff: (
			{ commit, dispatch, rootGetters }: { commit: any, dispatch: any, rootGetters: any },
			uniqueId: string,
		) => new Promise(async (resolve, reject) => {
			await rootGetters['hue/instance'].lightOff(uniqueId).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		}),
	},

	mutations: {
		SET_BRIDGE_ADDRESS: (state: any, address: string) => {
			state.instance = new HueAPI(address);
			localStorage.bridge_address = address;
		},
		SET_DEVICES: (state: any, devices: any) => {
			state.devices = devices;
		},
		REFRESH_TOKEN: (state: any) => {
			let token = null;
			if (state.instance) {
				const tempToken = state.instance.findExistingToken();
				if (tempToken) {
					token = tempToken;
				}
			}
			state.token = token;
		},
		SET_AVAILABILITY: (state: any, available: boolean) => {
			state.available = available;
		},
	},
};
