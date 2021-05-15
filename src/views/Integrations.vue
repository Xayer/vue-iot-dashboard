<template>
    <div>
        <portal to="page-title">Integrations</portal>
        <portal to="page-actions">
		    <IntegrationsPanel />
	    </portal>
        <router-view class="m-t" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IntegrationsPanel from '@/components/integrations/index.vue';

@Component({
	components: {
		IntegrationsPanel,
	},
})
export default class Integrations extends Vue {

}
</script>
