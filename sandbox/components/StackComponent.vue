<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'StackComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
		return {}
	},
})

</script>
	
<template>
	<div class="container">
		<slot name="children"></slot>
	</div>
</template>

<style>
	.container {
		display: flex; flex-wrap: no-wrap; flex-direction: column; align-items: stretch; gap: 12px;
	}
</style>