<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoHeadingComponent',
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
	<span class="font-semibold text-xl">
		{{ text }}
	</span>
</template>