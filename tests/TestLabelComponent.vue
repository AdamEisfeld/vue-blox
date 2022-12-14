<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestLabelComponent',
	components: undefined,
	props: {
		message: {
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
	<span>{{ message }}</span>
</template>
