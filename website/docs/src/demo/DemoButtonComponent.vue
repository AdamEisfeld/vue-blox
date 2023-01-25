<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../components/Button.vue';

export default defineComponent({
	name: 'DemoButtonComponent',
	components: {
		Button,
	},
	props: {
		title: {
			type: String,
			required: false,
			default: 'Button',
		}
	},
	emits: [
		'didClick'
	],
	setup(props, { emit }) {
		const onClick = () => {
			emit('didClick')
		}
		return {
			onClick,
		}
	},
})

</script>

<template>
	<Button :isSmall="true" @click="onClick" class="w-max">
		{{ title }}
	</Button>
</template>
