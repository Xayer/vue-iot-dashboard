<template>
	<div>
	<template v-if="isAuthenticated">
		<Button  class="m-l" :class="isAuthenticated ? 'primary' : 'danger'" :disabled="!isAuthenticated" @click="downloadSettings">Download Settings</Button>
		<Button  class="m-l" :class="isAuthenticated ? 'primary' : 'danger'" :disabled="!isAuthenticated" @click="uploadSettings">Upload Settings</Button>
		<Button  class="m-l" :class="isAuthenticated ? 'primary' : 'danger'" :disabled="!isAuthenticated" @click="signOut">sign out</Button>
	</template>
	<form v-else ref='form' @submit.stop.prevent="submitForm">
		<label for="username">Username:
			<FormInput name="username" class="form-field m-b" v-model="username" />
		</label>
		<label for="password">Password:
			<FormInput name="password" type="password" class="form-field m-b" v-model="password" />
		</label>
		<Button :class="isAuthenticated ? 'danger' : 'primary'" :disabled="isAuthenticated" @submit="submitForm">Authenticate</Button>
	</form>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { FormInput } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { themeStorageKey } from '@/constants/settings';

@Component({
	components: {
		FormInput,
		Button
	},
	computed: {
		...mapGetters({
			isAuthenticated: 'settings/isAuthenticated',
		})
	}
})
export default class Config extends Vue {
	password = '';

    username = '';

	$ref!: {
		form: typeof HTMLFormElement
	};

	// eslint-disable-next-line class-methods-use-this
	submitForm() {
    	const { username, password} = this;
		this.$store.dispatch('settings/authenticate', { username, password });
	}

	downloadSettings() {
		this.$store.dispatch('settings/download').then(() => {
			this.updateLocalSettings();
		});
	}

	uploadSettings() {
		this.$store.dispatch('settings/upload').then(() => {
			this.updateLocalSettings();
		});
	}

	updateLocalSettings() {
		console.log('called');
		this.$store.dispatch('themes/setTheme', localStorage.getItem(themeStorageKey));
	}

	signOut() {
		this.$store.dispatch('settings/signOut');
	}
}
</script>
