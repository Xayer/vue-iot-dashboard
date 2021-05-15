<template>
	<div>
		<a v-if="!$route.query.code" :href="authUrl">Authenticate with Spotify</a>
		<section v-if="topTracks">
			<article v-for="topTrack in topTracks" :key="topTrack.id">
				<img v-if="topTrack.album.images" :src="topTrack.album.images[2].url" :alt="`${topTrack.name } - ${topTrack.artists.concat(' ,')}`" />
				<div class="titles">
					<h2><a :href="topTrack.href">{{ topTrack.name }}</a></h2>
					<h3 v-for="artist in topTrack.artists" :key="artist.id"><a :href="artist.href">{{ artist.name }}</a></h3>
				</div>
			</article>
		</section>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authenticateToken, clientId, getAccessToken as spotifyGetAccessToken, getTopTracks, integrationActiveStorageKey, redirectUri, storageKey } from '@/modules/apis/spotify';

@Component({})
export default class SpotifyIntegrationPage extends Vue {
	topTracks = [];

	// eslint-disable-next-line class-methods-use-this
	get authUrl(): string {
		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing%20
user-top-read`;
	}

	async mounted() {
		this.getAccessToken();
	}
    
	async getAccessToken() {
		if(!this.$route.query.code) {
			return;
		}
		const existingToken = localStorage.getItem(storageKey);
		if(!existingToken || existingToken === 'undefined') {
			localStorage.setItem(integrationActiveStorageKey, JSON.stringify(false));
			const response = await authenticateToken(this.$route.query.code as string);
			localStorage.setItem(storageKey, response.refresh_token);
		}
		await getTopTracks().then((topTracks) => {
			this.topTracks = topTracks.items;
			localStorage.setItem(integrationActiveStorageKey, JSON.stringify(true));
		});		
	}
}
</script>
<style lang="scss">
	section {
		article {
			display: flex;
			gap: 10px;
			margin-bottom: 15px;
		}
	}
</style>