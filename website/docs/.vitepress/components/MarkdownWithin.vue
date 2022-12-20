<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'MarkdownWithin',
	components: {},
	props: undefined,
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div>
		<slot></slot>
	</div>
</template>
