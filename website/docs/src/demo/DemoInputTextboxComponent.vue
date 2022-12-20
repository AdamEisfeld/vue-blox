<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DemoInputTextboxComponent',
	components: undefined,
	props: {
		text: {
			type: [String, Number, Boolean, Array],
			required: false,
			default: null,
		},
		label: {
			type: String,
			required: false,
			default: undefined,
		},
		isDisabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: [
		'update:text',
		'on:focus',
		'on:blur',
	],
	setup(props, { emit }) {
		const emitUpdateText = (event: any) => {
			emit('update:text', event.target.value)
		}
		const emitFocus = () => {
			emit('on:focus')
		}
		const emitBlur = () => {
			emit('on:blur')
		}
		return {
			emitUpdateText,
			emitFocus,
			emitBlur,
		}
	},
})

</script>
	
<template>
	<div class="flex flex-col gap-2" :class="isDisabled ? 'opacity-50' : ''">
		<template v-if="label">
			<span class="font-semibold">{{ label }}</span>
		</template>
		<div class="flex flex-col w-full h-8 rounded-lg overflow-hidden border border-gray-200 active-within:border-brand focus-within:border-brand">
			<input :disabled="isDisabled" type="text" :value="text" @focus="emitFocus()" @blur="emitBlur()" class="p-2.5 bg-input text-sm w-full border-none outline-none h-full" style="min-height: none; -moz-box-sizing: border-box; box-sizing: border-box;" @input="emitUpdateText">
		</div>
	</div>
</template>
