<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestLabelComponent',
	components: undefined,
	props: {
		text: {
			type: String,
			required: false,
			default: undefined,
		},
	},
	emits: [],
	setup(props, { emit }) {
		return {}
	},
})

</script>
	
<template>
	<span>{{ text }}</span>
</template>
