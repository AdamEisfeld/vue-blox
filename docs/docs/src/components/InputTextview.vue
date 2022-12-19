<script lang="ts">
import { text } from 'stream/consumers'
import { defineComponent, onMounted, Ref, ref } from 'vue'

export default defineComponent({
	name: 'InputTextview',
	components: undefined,
	props: {
		text: {
			type: String,
			required: false,
			default: undefined,
		},
		placeholder: {
			type: String,
			required: false,
			default: undefined,
		},
		isDisabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		isSpellCheckEnabled: {
			type: Boolean,
			required: false,
			default: true,
		},
		isWrapEnabled: {
			type: Boolean,
			required: false,
			default: true,
		},
		isResizeHorizontalEnabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		isResizeVerticalEnabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		minimumHeight: {
			type: Number,
			required: false,
			default: 6
		},
		maximumHeight: {
			type: Number,
			required: false,
			default: 12
		},
		isAutosizeEnabled: {
			type: Boolean,
			required: false,
			default: true,
		}
	},
	emits: [
		'update:text',
		'on:focus',
		'on:blur',
	],
	setup(props, { emit }) {

		const refTextArea: Ref<any> = ref(undefined)

		const emitUpdateText = (event: any) => {
			autosizeTextArea()
			emit('update:text', event.target.value)
		}
		const emitFocus = () => {
			emit('on:focus')
		}
		const emitBlur = () => {
			emit('on:blur')
		}

		const autosizeTextArea = () => {

			if (!props.isAutosizeEnabled) {
				return
			}

			const remToPx = (rem: number): number => {    
				return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
			}

			const minHeight = remToPx(props.minimumHeight)
			const maxHeight = remToPx(props.maximumHeight)
			const textArea = refTextArea.value
			textArea.setAttribute('style', 'height: auto;');
			const height = Math.min(maxHeight, Math.max(minHeight, textArea.scrollHeight))
			textArea.setAttribute('style', `height: ${height}px;`);
		}

		onMounted(() => {
			autosizeTextArea()
		})

		return {
			emitUpdateText,
			emitFocus,
			emitBlur,
			refTextArea,
		}
	},
})

</script>
	
<template>
	<textarea 
	ref="refTextArea"
	:placeholder="placeholder"
	:spellcheck="isSpellCheckEnabled"
	onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"
	:disabled="isDisabled"
	type="text"
	@focus="emitFocus()"
	@blur="emitBlur()"
	:value="text"
	class="p-4 bg-white text-sm font-normal w-full border-gray-200 border outline-none rounded-xl"
	:class="[
		isWrapEnabled ? '' : 'break-keep whitespace-pre',
		isResizeHorizontalEnabled && isResizeVerticalEnabled ? 'resize' : '',
		isResizeHorizontalEnabled && !isResizeVerticalEnabled ? 'resize-x' : '',
		!isResizeHorizontalEnabled && isResizeVerticalEnabled ? 'resize-y' : '',
		!isResizeHorizontalEnabled && !isResizeVerticalEnabled ? 'resize-none' : '',
		isDisabled ? 'opacity-50' : '',
	]"
	style="min-height: none; -moz-box-sizing: border-box; box-sizing: border-box;"
	@input="emitUpdateText">
	</textarea>
</template>
