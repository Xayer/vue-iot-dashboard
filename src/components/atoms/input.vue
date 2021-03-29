<template>
	<input v-model="name" />
</template>
<script lang="ts">
import {
	Vue, Component, VModel,
} from 'vue-property-decorator';

@Component({
})
export default class Input extends Vue {
	@VModel({ type: String }) name!: string;
}
</script>
