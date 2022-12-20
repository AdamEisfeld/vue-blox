<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoLabelComponent',
	components: {},
	props: {
		text: {
			type: [String, Number, Boolean],
			required: false,
			default: undefined
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<span v-html="text"></span>
</template>