<template>
	<div class="connection">
		<i class="icon" :class="online ? 'on': 'off'">&#9679;</i>
		<pre v-text="connection"></pre>
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
export default class Internet extends Vue {
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
	pre {
		text-transform: uppercase;
		display: inline-block;
		margin-inline-start: 0.5rem;
	}
	.connection {
		padding: {
			inline-start: 0.5rem;
			inline-end: 0.5rem;
		}
	}
	i {
		display: inline-block;
	}
	.on {
		color: green;
	}
	.off {
		color: red;
	}
</style>
