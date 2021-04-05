<template>
	<div class="connection">
		<i class="bi" :title="connection" :class="online ? 'bi-wifi on': 'bi-wifi-off off'"></i>
	</div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
	computed: {
		...mapGetters({
			online: 'internet/online',
		}),
	},
})
export default class InternetWidget extends Vue {
	created() {
		window.addEventListener('offline', () => {
			this.$store.commit('internet/SET_CONNECTION_STATUS', false);
		});
		window.addEventListener('online', () => {
			this.$store.commit('internet/SET_CONNECTION_STATUS', true);
		});
	}

	get connection() {
		return this.online ? 'Online' : 'Offline';
	}
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
