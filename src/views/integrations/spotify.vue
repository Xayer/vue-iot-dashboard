<template>
	<div>
		<h3 class="m-b">Spotify</h3>
		<a v-if="!$route.query.code && !integrationActive" :href="authUrl">Authenticate with Spotify</a>
		<section v-if="topTracks">
			<article v-for="topTrack in topTracks" :key="topTrack.id">
				<img
					v-if="topTrack.album.images"
					:src="topTrack.album.images[2].url"
					:alt="`${topTrack.name } - ${topTrack.artists.join(', ')}`"
					:width="topTrack.album.images[2].width"
					:height="topTrack.album.images[2].height"
				/>
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

	// eslint-disable-next-line class-methods-use-this
	get integrationActive() {
		return JSON.stringify(localStorage.getItem(integrationActiveStorageKey)) === "true";
	}

	async mounted() {
		this.getAccessToken();
	}
    
	async getAccessToken() {
		if(!this.$route.query.code && !this.integrationActive) {
			return;
		}
		const existingToken = localStorage.getItem(storageKey);
		if(!existingToken || existingToken === 'undefined') {
			localStorage.setItem(integrationActiveStorageKey, JSON.stringify(false));
			const response = await authenticateToken(this.$route.query.code as string);
			localStorage.setItem(storageKey, JSON.stringify(response.refresh_token));
		}
		await getTopTracks().then((topTracks) => {
			this.topTracks = topTracks.items;
			localStorage.setItem(integrationActiveStorageKey, JSON.stringify(true));
		}).catch(() => {
			localStorage.setItem(integrationActiveStorageKey, JSON.stringify(false));
		});		
	}
}
</script>
<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		article {
			display: flex;
			justify-content: start;
			align-items: center;
			gap: 10px;
			background-color: var(--dark-bg-alt);
			.titles {
				padding: 5px;
			}
		}
	}
</style>