<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestStackNoNameComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
	},
})

</script>
	
<template>
	<div>
		<slot></slot>
	</div>
</template>
