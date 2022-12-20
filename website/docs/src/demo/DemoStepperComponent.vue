<script lang="ts">
import { defineComponent, computed } from 'vue'
import Button from '../components/Button.vue';

export default defineComponent({
	name: 'DemoStepperComponent',
	components: {
		Button,
	},
	props: {
		value: {
			type: [String, Number, Boolean],
			required: false,
			default: 0
		}
	},
	emits: [
		'update:value'
	],
	setup(props, { emit }) {
		const numericValue = computed(() => {
			if (typeof props.value === 'number') {
				return props.value
			} else if (typeof props.value === 'string') {
				return parseFloat(props.value)
			} else {
				return parseFloat(`${props.value}`)
			}
		})
		const onUp = () => {
			emit('update:value', numericValue.value + 1)
		}
		const onDown = () => {
			emit('update:value', numericValue.value - 1)
		}
		return {
			onUp,
			onDown,
		}
	},
})

</script>

<template>
	<div class="flex flex-row gap-4 items-center">
		<Button :isSmall="true" :isSquare="true" @click="onDown()"><FontAwesomeIcon icon="fa-solid fa-minus"/></Button>
		<span>{{ value }}</span>
		<Button :isSmall="true" :isSquare="true" @click="onUp()"><FontAwesomeIcon icon="fa-solid fa-plus"/></Button>
	</div>
</template>
