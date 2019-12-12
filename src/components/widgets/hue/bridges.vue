<template>
	<div>
		{{ bridges }}
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HueBridges extends Vue {
  @Prop() private text!: string;

	v3!: any;

	hueApi!: any;

	bridges!: any;

	discovery!: any;

	appName: string = 'node-hue-api';

	deviceName: string = 'example-code';

	created() {
		// eslint-disable-next-line global-require
		this.v3 = require('node-hue-api').v3;
		this.hueApi = this.v3.api;
		this.discovery = this.v3.discovery;
		this.bridges = 'hello';
		this.discoverAndCreateUser();
	}

	// eslint-disable-next-line class-methods-use-this
	async discoverBridge() {
		const discoveryResults = await this.discovery.nupnpSearch();

		if (discoveryResults.length === 0) {
			console.error('Failed to resolve any Hue Bridges');
			return null;
		}
		// Ignoring that you could have more than one Hue Bridge on a network
		// as this is unlikely in 99.9% of users situations
		return discoveryResults[0].ipaddress;
	}

	async discoverAndCreateUser() {
		const ipAddress = await this.discoverBridge();

		// Create an unauthenticated instance of the Hue API so that we can create a new user
		const unauthenticatedApi = await this.hueApi.createLocal(ipAddress).connect();

		let createdUser;
		try {
			createdUser = await unauthenticatedApi.users.createUser(this.appName, this.deviceName);
			console.log('*******************************************************************************\n');
			console.log('User has been created on the Hue Bridge. The following username can be used to\n'
						+ 'authenticate with the Bridge and provide full local access to the Hue Bridge.\n'
						+ 'YOU SHOULD TREAT THIS LIKE A PASSWORD\n');
			console.log(`Hue Bridge User: ${createdUser.username}`);
			console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
			console.log('*******************************************************************************\n');

			// Create a new API instance that is authenticated with the new user we created
			const authenticatedApi = await this.hueApi
				.createLocal(ipAddress).connect(createdUser.username);

			// Do something with the authenticated user/api
			const bridgeConfig = await authenticatedApi.configuration.get();
			console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);
		} catch (err) {
			if (err.getHueErrorType() === 101) {
				console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
			} else {
				console.error(`Unexpected Error: ${err.message}`);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	div {
		display: grid;
		height: 100%;
		align-items: center;
		justify-items: center;
		h1 {
			margin: 0;
			padding: 0;
		}
	}
</style>
