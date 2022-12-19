<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoProfileImageComponent',
	components: {},
	props: {
		url: {
			type: String,
			required: false,
			default: undefined
		},
		name: {
			type: String,
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
	<div class="flex flex-col gap-2">
		<img :src="url" class="rounded-full w-24 h-24"/>
	</div>
</template>