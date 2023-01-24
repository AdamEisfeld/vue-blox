<script lang="ts">

import { defineComponent, watch, reactive } from 'vue'
import BloxComponent from '../src/components/BloxComponent.vue'
import { BloxError, type BloxPluginInterface } from '../src'

export default defineComponent({
	name: 'App',
	components: {
		BloxComponent,
	},
	props: {},
	setup() {

		// 1. Construct variables
		
		const variables: any = reactive({
			bar: 'Adam',
			foo: 'Tom',
			baz: 'Joey',
			score: 0,
		})

		// 2. Construct view

		const view: any = {
			type: 'stack',
			'slot:children': [
				{
					type: 'button',
					'bind:message': 'foo',
					'bind:count': 'score',
				},
				{
					type: 'button',
					'message': '[smiley] Hello',
					'bind:count': 'score',
				}
			]
		}

		watch(variables, () => {
			console.log('Changes have been made!')
		}, {
			deep: true
		})

		const onError = (error: any) => {
			const bloxError = BloxError.asBloxError(error)
			if (bloxError) {
				console.log(bloxError.debugMessage)
			} else {
				console.log(error)
			}
		}

		class TestPluginSmileys implements BloxPluginInterface {

			run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): void {

				if (typeof value !== 'string') {
					return undefined
				}
				setProp(key, (value as string).replace(/\[smiley\]/g, '😊'))

			}

		}

		const plugins = [
			new TestPluginSmileys()
		]

		variables.score = 4

		return {
			variables,
			view,
			onError,
			plugins,
		}
	},
})
</script>

<template>
	<main>
		<BloxComponent :view="view" :variables="variables" @on:error="onError" :plugins="plugins"/>
	</main>
</template>
