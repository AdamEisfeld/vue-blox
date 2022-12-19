<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoCellComponent',
	components: {},
	props: undefined,
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div class="border-gray-200 border rounded-lg text-center p-4">
		<slot name="content">Empty cell</slot>
	</div>
</template>
