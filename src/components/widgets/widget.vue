<template>
    <div class="widget"><slot /></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Widget extends Vue {

}
</script>
<style lang="scss">
    .vue-grid-item {
		background-color: var(--widget-bg);
		padding: 15px;
		box-sizing: border-box;
		overflow: hidden;
        border-radius: var(--radius);
	}
</style>
