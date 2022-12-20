<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'DemoImageComponent',
	components: {},
	props: {
		url: {
			type: String,
			required: false,
			default: undefined
		},
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<img :src="url" class="rounded object-contain w-48 bg-gray-50"/>
</template>