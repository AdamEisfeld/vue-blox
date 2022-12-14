<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestStackComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
	},
})

</script>
	
<template>
	<div>
		<slot name="children"></slot>
	</div>
</template>
