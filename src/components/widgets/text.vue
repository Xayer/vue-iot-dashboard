<template>
	<div>
		<h1 v-text="text"></h1>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextWidget extends Vue {
  @Prop() private text!: string;
}
</script>
<style lang="scss" scoped>
	div {
		display: grid;
		height: 100%;
		align-items: center;
		justify-items: center;
		h1 {
			margin: 0;
			padding: 0;
		}
	}
</style>
