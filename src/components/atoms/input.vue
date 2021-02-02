<template>
	<input v-model="value" />
</template>
<script lang="ts">
import {
	Vue, Component, Model,
} from 'vue-property-decorator';
@Component({
})
export default class Input extends Vue {
	@Model('input') readonly value!: string;
}
</script>
