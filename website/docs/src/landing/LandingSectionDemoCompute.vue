<script lang="ts">
import { ComponentPublicInstance, defineComponent } from 'vue'
import LandingSectionDemo from './LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoCompute',
	components: {
		LandingSectionDemo,
	},
	props: {
		catalog: {
			type: Object as () => Record<string, ComponentPublicInstance<any>>,
			required: true,
		}
	},
	setup() {

		const startingVariables: Record<string, any> = {
			'x': 5,
			'y': 2,
			'threshold': 9,
			quotes: [
				'Yes, it is less.',
				'No, it is not.'
			],
		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'stepper',
				'bind:value': 'threshold',
			},
			{
				type: 'label',
				'text': 'Is {{ x }} * {{ y }} less than {{ threshold }} ?'
			},
			{
				type: 'label',
				'compute:text': 'x * y < threshold ? quotes[0] : quotes[1]'
			},
		]

		const selectableComponents: { name: string, model: any }[] = [
			{
				name: 'Heading',
				model: {
					type: 'heading'
				}
			},
			{
				name: 'Stepper',
				model: {
					type: 'stepper',
					value: 0,
				}
			},
			{
				name: 'Label',
				model: {
					type: 'label',
					text: 'Hello, labels!'
				}
			},
		]

		return {
			startingVariables,
			startingModels,
			selectableComponents,
		}
	},
})
</script>

<template>
	<LandingSectionDemo class="bg-brand"
		:catalog="catalog"
		:isInverted="true"
		:isVariablesEnabled="true"
		:startingVariables="startingVariables"
		:startingModels="startingModels"
		:selectableComponents="selectableComponents"
		title="Runtime Expressions"
		caption="Evaluate expressions and call functions you expose directly from your view definitions."
	/>
</template>
