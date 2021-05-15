<template>
    <div>
        <a :href="authUrl">Auth</a>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { clientId, redirectUri } from '@/modules/apis/spotify';

@Component({})
export default class SpotifyIntegration extends Vue {
	// eslint-disable-next-line class-methods-use-this
	get authUrl(): string {
		
		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing%20
user-top-read`;
	}
}
</script>