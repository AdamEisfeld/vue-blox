<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestButtonCounterComponent',
	components: {},
	props: {
		count: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	emits: [
		'update:count'
	],
	setup(props, { emit }) {
		const onClick = () => {
			emit('update:count', props.count + 1)
		}
		return {
			onClick
		}
	},
})

</script>
	
<template>
	<button ref="clickMe" class="clickMe" id="clickMe" @click="onClick">
		Count: {{ count }}
	</button>
</template>
