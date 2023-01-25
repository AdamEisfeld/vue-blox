<script lang="ts">
import { ComponentPublicInstance, defineComponent } from 'vue'
import LandingSectionDemo from './LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoEvent',
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
			'isMessageHidden': true,
		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'label',
				'text': 'Click the button below to reveal a message and log a statement.'
			},
			{
				type: 'button',
				'event:didClick': 'setVariable("isMessageHidden", false); console("The user clicked the button!")',
			},
			{
				type: 'label',
				'compute:isHidden': 'isMessageHidden',
				'text': 'Simple but powerful!'
			},
		]

		const selectableComponents: { name: string, model: any }[] = [
			{
				name: 'Stepper',
				model: {
					type: 'stepper',
					value: 0,
				}
			},
			{
				name: 'Button',
				model: {
					type: 'button',
					title: 'Click Me',
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
	<LandingSectionDemo class="bg-gray-50"
		:catalog="catalog"
		:isInverted="false"
		:isVariablesEnabled="true"
		:startingVariables="startingVariables"
		:startingModels="startingModels"
		:selectableComponents="selectableComponents"
		title="Event Listeners"
		caption="Listen for emitted events and invoke functions."
	/>
</template>
