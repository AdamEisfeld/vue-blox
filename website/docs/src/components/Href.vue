<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'Href',
	components: {},
	props: {
		isEnabled: {
			type: Boolean,
			required: false,
			default: true,
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<button class="font-semibold flex flex-row items-center gap-2"
	:class="isEnabled ? 'transition duration-100 ease-in-out transform hover:scale-3dlg cursor-pointer' : 'cursor-none opacity-50'">
		<slot></slot>
	</button>
</template>
