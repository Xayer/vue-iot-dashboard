<template>
	<form ref='form' @submit.stop.prevent="submitForm">
		<label for="username">Username:
			<FormInput name="username" class="form-field m-b" v-model="username" />
		</label>
		<label for="password">Password:
			<FormInput name="password" type="password" class="form-field m-b" v-model="password" />
		</label>
		<Button :class="isAuthenticated ? 'danger' : 'primary'" :disabled="isAuthenticated" @submit="submitForm">Authenticate</Button>
	</form>
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
}
</script>
