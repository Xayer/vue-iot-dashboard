<template>
	<router-link :to="{ name: 'config-integration' }" ><div class="settings">
		<i class="bi"
        :title="isAuthenticated ? 'Settings sync connected' : 'Settings sync disconnected' "
        :class="isAuthenticated ? 'bi-cloud-check-fill on': 'bi-cloud-slash-fill off'"></i>
	</div></router-link>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
	computed: {
		...mapGetters({
			isAuthenticated: 'settings/isAuthenticated',
		}),
	},
})
export default class InternetWidget extends Vue {
}
</script>
<style lang="scss">
	span {
		text-transform: capitalize;
		display: inline-block;
		margin: {
			block-start: 0;
			block-end: 0;
		}
	}
	i {
		display: inline-block;
		margin-inline-end: 0.5rem;
	}
	.on {
		color: var(--success);
	}
	.off {
		color: var(--danger);
	}
</style>
