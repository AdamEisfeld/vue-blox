<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoGridComponent',
	components: {},
	props: {
		columns: {
			type: Number,
			required: false,
			default: 2
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div class="grid grid-cols-3 gap-4 p-4 border-gray-200 border rounded-lg" :class="[
		columns === 1 ? 'grid-cols-1' : '',
		columns === 2 ? 'grid-cols-2' : '',
		columns === 3 ? 'grid-cols-3' : '',
		columns === 4 ? 'grid-cols-4' : '',
		columns === 5 ? 'grid-cols-5' : '',
		columns === 6 ? 'grid-cols-6' : '',
		columns <= 0 || columns > 6 ? 'grid-cols-1' : '',
	]">
		<slot name="children">No child views specified</slot>
	</div>
</template>
