<template>
	<div>
	<template v-if="isAuthenticated">
		<Button  class="m-l" :class="isAuthenticated ? 'primary' : 'danger'" :disabled="!isAuthenticated" @click="fetchSettings">Fetch Settings</Button>
		<Button  class="m-l" :class="isAuthenticated ? 'primary' : 'danger'" :disabled="!isAuthenticated" @click="updateSettings">update Settings</Button>
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

	fetchSettings() {
		this.$store.dispatch('settings/fetch');
	}

	updateSettings() {
		this.$store.dispatch('settings/update');
	}

	signOut() {
		this.$store.dispatch('settings/signOut');
	}
}
</script>
