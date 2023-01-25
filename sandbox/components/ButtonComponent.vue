<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'ButtonComponent',
	components: undefined,
	props: {
		title: {
			type: String,
			required: false,
			default: undefined,
		},
	},
	emits: [
		'clicked',
	],
	setup(props, { emit }) {

		const clicked = () => {
			emit('clicked')
		}

		return {
			clicked,
		}
	},
})

</script>
	
<template>
	<button @click="clicked">{{ title }}</button>
</template>
