<script lang="ts">
import { defineComponent} from 'vue'
import BloxView from '../src/BloxView.vue';

export default defineComponent({
	name: 'StackComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
		return {}
	},
})

</script>
	
<template>
	<div>
		<slot name="children"></slot>
	</div>
</template>
