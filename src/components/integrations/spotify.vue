<template>
    <div class="spotify">
        <router-link :to="{ name: 'spotify-integration' }" ><i class="bi bi-music-note-beamed" :class="active ? 'on' : 'off'"></i></router-link>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { clientId, integrationActiveStorageKey, redirectUri } from '@/modules/apis/spotify';

@Component({})
export default class SpotifyIntegration extends Vue {
	// eslint-disable-next-line class-methods-use-this
	get active() {
		return JSON.stringify(localStorage.getItem(integrationActiveStorageKey));
	}
}
</script>