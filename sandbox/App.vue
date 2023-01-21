<script lang="ts">

import { defineComponent, watch } from 'vue'
import { getBloxBindings } from '../src/composables/getBloxBindings'
import { getBloxView } from '../src/composables/getBloxView'
import BloxComponent from '../src/components/BloxComponent.vue'
import { BloxError, type BloxBindings, type BloxView } from '../src'

export default defineComponent({
	name: 'App',
	components: {
		BloxComponent,
	},
	props: {},
	setup() {

		// 1. Construct variables
		
		const inputVariables: any = {
			bar: 'Adam',
			foo: 'Tom',
			baz: 'Joey',
			score: 0,
		}

		// 2. Construct view

		const inputView: any = {
			type: 'stack',
			'test:children': [
				{
					type: 'button',
					'binder:message': 'foo',
					'binder:count': 'score',
				},
				{
					type: 'button',
					'message': '{{ bar }} and {{ baz }}',
					'binder:count': 'score',
				}
			]
		}

		let bindings: BloxBindings | undefined = undefined
		let view: BloxView | undefined = undefined

		try {
			bindings = getBloxBindings(inputVariables)
			view = getBloxView(inputView, bindings, undefined, {
				componentSpecifier: 'type',
				slotSpecifier: 'test:',
				bindSpecifier: 'binder:'
			})
		} catch(error) {
			console.log(error)
		}

		if (bindings) {
			watch(Object.values(bindings.entries), () => {
				console.log('Changes have been made!')
			})
		}

		const onError = (error: any) => {
			const bloxError = BloxError.asBloxError(error)
			if (bloxError) {
				console.log(bloxError.debugMessage)
			} else {
				console.log(error)
			}
		}

		return {
			bindings,
			view,
			onError,
		}
	},
})
</script>

<template>
	<main>
		<BloxComponent :view="view" :bindings="bindings" @on:error="onError"/>
	</main>
</template>
