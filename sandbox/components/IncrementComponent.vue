<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'IncrementComponent',
	components: undefined,
	props: {
		value: {
			type: Number,
			required: false,
			default: 0,
		}
	},
	emits: [
		'update:value',
	],
	setup(props, { emit }) {

		const clicked = () => {
			emit('update:value', props.value + 1)
		}

		return {
			clicked,
		}
	},
})

</script>
	
<template>
	<button @click="clicked">{{ value }}</button>
</template>
