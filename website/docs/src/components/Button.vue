<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'Button',
	components: {},
	props: {
		isFilled: {
			type: Boolean,
			required: false,
			default: true
		},
		isSmall: {
			tyoe: Boolean,
			required: false,
			default: false,
		},
		isSquare: {
			type: Boolean,
			required: false,
			default: false,
		},
		isInverted: {
			type: Boolean,
			required: false,
			default: false,
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<button class="rounded-xl font-medium flex flex-row items-center gap-4 transition duration-100 ease-in-out transform hover:scale-3dlg" :class="[
		isFilled ?
			!isInverted ? 'ring-1 ring-brand bg-brand text-white' : 'bg-white text-brand' :
			!isInverted ? 'ring-1 ring-brand text-brand' : 'ring-1 ring-white text-white',
		isSmall ? 'px-4 py-2' : 'px-8 py-4 text-md',
		isSquare ? 'aspect-square' : ''
		]">
		<slot></slot>
	</button>
</template>
