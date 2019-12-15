import HueAPI from '@/modules/apis/hue';
import { Devices } from '@/types/hue';

const API = new HueAPI();

export default {
	state: {
		devices: {},
	},

	getters: {
		devices: (state:any) => state.devices,
		token: (state: any) => API.findExistingToken(),
	},

	actions: {
		getDevices: (
			{ commit, dispatch }: { commit: any, dispatch: any },
		) => new Promise(async (resolve, reject) => {
			await API.getDevices().then((value: unknown) => {
				commit('SET_DEVICES', value);
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
			reject();
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
			{ uniqueId, on }: { uniqueId: string, on: boolean },
		) => new Promise(async (resolve, reject) => {
			await API.toggleLight(uniqueId, on).then(() => {
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
	},
};
