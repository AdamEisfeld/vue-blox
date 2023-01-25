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
		'user:clickedMe'
	],
	setup(props, { emit }) {

		const clicked = () => {
			emit('update:count', props.count + 1)
			emit('user:clickedMe')
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
