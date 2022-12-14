<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'TestTwoSlotsComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
	},
})

</script>
	
<template>
	<div>
		<slot name="header"></slot>
		<slot name="body"></slot>
	</div>
</template>
