<script lang="ts">
import { defineComponent, toRef, watch, Ref, ref, shallowRef } from 'vue'
import { BloxView, BloxModel, BloxCatalog, useBlox } from '../src'
import StackComponent from './StackComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {


		/**
		 * 
		 * const blox = defineBlox({
		 * 		'stack': StackComponent,
		 * 		'button': ButtonComponent,
		 * 		... etc
		 * })
		 * 
		 * app.use(blox) // stores catalog in some singleton
		 * 
		 * 
		 * 
		 */



		// 1. Register components

		const catalog = new BloxCatalog()
		catalog.register({
			type: 'stack',
			component: StackComponent,
		})
		catalog.register({
			type: 'button',
			component: ButtonComponent,
		})

		// 2. Construct variables

		const inputVariables: any = {
			foo: 'Adam',
			score: 0,
		}

		// 3. Construct view

		const inputModel: any = {
			type: 'stack',
			'slot:children': [
				{
					type: 'button',
					'bind:message': 'foo',
					'bind:count': 'score',
				},
				{
					type: 'button',
					'bind:message': 'foo',
					'bind:count': 'score',
				}
			]
		}

		// 4. Process data


		// const { model, variables } = BloxModel.from(inputModel, inputVariables)

		const bloxModel: Ref<BloxModel | undefined> = ref(undefined)
		const bloxVariables: Ref<Record<string, Ref<any>>> = shallowRef({})

		const { processedView, model, variables } = useBlox(inputModel, inputVariables)
		
		bloxModel.value = model
		bloxVariables.value = variables

		// const { model, variables } = useBlox(inputModel, inputVariables)

		// watch(Object.values(variables), () => {
		// 	console.log('Changed:')
		// 	console.log(JSON.stringify(Object.values(variables).map(v => v.value)))
		// })

		// variables['score'].value = 10

		const onSwap = () => {
			const inputVariables: any = {
				bar: 'LAWL',
				score: 0,
			}
			const inputModel: any = {
				type: 'stack',
				'slot:children': [
					{
						type: 'button',
						'bind:message': 'bar',
						'bind:count': 'score',
					},
					{
						type: 'button',
						'bind:message': 'bar',
						'bind:count': 'score',
					}
				]
			}
			
			console.log(`Before Vars are ${JSON.stringify(bloxVariables)}`)

			const { processedView, model, variables } = useBlox(inputModel, inputVariables, bloxVariables.value)
			console.log(JSON.stringify(processedView))
			bloxModel.value = model
			bloxVariables.value = variables
		}

		return {
			bloxModel,
			bloxVariables,
			catalog,
			onSwap,
		}
	},
})
</script>

<template>
	<main>
		<button @click="onSwap">Swap</button>
		<BloxView :model="bloxModel" :variables="bloxVariables"/>
	</main>
</template>
