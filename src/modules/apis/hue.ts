import { AxiosResponse } from 'axios';
import API from './client';

const protocol: string = 'http://';
const host = process.env.VUE_APP_HUE_BRIDGE_IP;
const baseUrl: string = '/api';
const version: string = '';
const appName = 'iot-dashboard';
const device = 'dashboard';

export default class HueAPI extends API {
	private token!: string;

	constructor() {
		super({
			protocol,
			host,
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
					resolve(response.data[0].success.username);
				}

				reject(response.data[0].error);
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}

	findExistingToken() {
		if (localStorage.hue && localStorage.hue !== 'undefined') {
			this.token = localStorage.hue;
			return this.token;
		}
		return false;
	}

	getDevices() {
		return new Promise((resolve, reject) => {
			if (!this.findExistingToken()) {
				reject(Error('token missing'));
			}
			this.get(localStorage.hue).then((response: AxiosResponse) => {
				resolve(response);
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
