<script lang="ts">

import { defineComponent, watch } from 'vue'
import { getBloxBindings } from '../src/composables/getBloxBindings'
import { getBloxView } from '../src/composables/getBloxView'
import BloxComponent from '../src/components/BloxComponent.vue'

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
			'slot:children': [
				{
					type: 'button',
					'bind:message': 'foo',
					'bind:count': 'score',
				},
				{
					type: 'button',
					'message': '{{ bar }} and {{ baz }}',
					'bind:count': 'score',
				}
			]
		}

		const bindings = getBloxBindings(inputVariables)
		const view = getBloxView(inputView, bindings)

		watch(Object.values(bindings.entries), () => {
			console.log('Changes have been made!')
		})

		return {
			bindings,
			view,
		}
	},
})
</script>

<template>
	<main>
		<BloxComponent :view="view" :bindings="bindings"/>
	</main>
</template>
