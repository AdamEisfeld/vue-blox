<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'Parameter',
	components: {},
	props: undefined,
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div class="flex flex-col gap-4 p-4">
		<div class="w-full h-px bg-gray-100"></div>
		<div class="flex flex-row gap-2 items-baseline">
			<span class="font-bold px-2 py-1 bg-pink-500 text-white rounded-lg">
				<slot name="name"></slot>
			</span>
		</div>
		<div class="font-medium">
			<slot name="link"></slot>
		</div>
		<slot name="description"></slot>
	</div>
</template>
