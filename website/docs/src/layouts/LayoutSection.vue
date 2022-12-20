<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'LayoutSection',
	components: {},
	props: {
		isFullScreen: {
			type: Boolean,
			required: false,
			default: false,
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div class="w-full" :class="isFullScreen ? 'h-screen' : ''">
		<div class="p-12 md:pb-24 flex flex-col gap-4 w-full md:w-auto md:container m-auto" :class="isFullScreen ? 'h-full' : ''">
			<slot></slot>
		</div>
	</div>
</template>
