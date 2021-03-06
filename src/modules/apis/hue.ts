import { AxiosResponse } from 'axios';
import { Devices } from '@/types/hue';
import API from './client';

const protocol: string = 'http://';
const baseUrl: string = '/api';
const version: string = '';
const appName = 'iot-dashboard';
const device = 'dashboard';

export default class HueAPI extends API {
	private token!: string;

	constructor(bridgeAddress: string) {
		super({
			protocol,
			host: bridgeAddress,
			baseURL: baseUrl,
			version,
		});
	}

	registerToken() {
		return new Promise((resolve, reject) => {
			if (this.findExistingToken()) {
				resolve(this.token);
			}
			this.post('', {
				devicetype: `${appName}#${device}`,
			}).then((response: AxiosResponse) => {
				if ('success' in response.data[0] && 'username' in response.data[0].success) {
					localStorage.hue = response.data[0].success.username;
					this.token = localStorage.hue;
					resolve(response.data[0].success.username);
				}

				reject(response.data[0].error);
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}

	findExistingToken() {
		if (!this.token && (localStorage && typeof localStorage.hue !== 'undefined')) {
			this.token = localStorage.hue;
		}
		// eslint-disable-next-line no-extra-boolean-cast
		return !!(this.token && typeof this.token !== 'undefined' && this.token !== 'undefined') ? this.token : false;
	}

	getDevices() {
		return new Promise(async (resolve, reject) => {
			if (!this.findExistingToken()) {
				reject(Error('token missing'));
			}
			try {
				await this.get(`${this.token}`).then((response: AxiosResponse<Devices>) => {
					resolve(response.data);
				}).catch((error: Error) => {
					reject(error);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	toggleLight(uniqueid: string, on: boolean, colour?: Array<number>) {
		return new Promise(async (resolve, reject) => {
			if (!this.findExistingToken()) {
				reject(Error('token missing'));
			}

			const toggleData : { on: boolean, colour?: Array<number> } = {
				on,
			};

			if (colour) {
				toggleData.colour = colour;
			}

			await this.put(`${this.token}/lights/${uniqueid}`, 'state', toggleData).then((response: AxiosResponse<Devices>) => {
				resolve(response.data);
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}

	lightOn(uniqueid: string) {
		return new Promise(async (resolve, reject) => {
			this.toggleLight(uniqueid, true).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}

	lightOff(uniqueid: string) {
		return new Promise(async (resolve, reject) => {
			this.toggleLight(uniqueid, false).then(() => {
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
