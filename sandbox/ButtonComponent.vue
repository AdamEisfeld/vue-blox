<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'ButtonComponent',
	components: undefined,
	props: {
		message: {
			type: String,
			required: false,
			default: undefined,
		},
		count: {
			type: Number,
			required: false,
			default: 0,
		}
	},
	emits: [
		'update:message',
		'update:count',
	],
	setup(props, { emit }) {

		const clicked = () => {
			emit('update:count', props.count + 1)
		}

		return {
			clicked,
		}
	},
})

</script>
	
<template>
	<button @click="clicked">Hello, {{ message }}. Clicked {{ count }} times</button>
</template>
