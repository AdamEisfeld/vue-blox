<script lang="ts">
import { defineComponent } from 'vue'
import { BloxCatalog } from 'vue-blox'
import LandingSectionDemo from '../landing/LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoBindVariables',
	components: {
		LandingSectionDemo,
	},
	props: {
		catalog: {
			type: Object as () => BloxCatalog,
			required: true,
		}
	},
	setup() {

		const startingVariables: Record<string, any> = {
			'message': 'This is a bound variable! Try editing it in the JSON or in this Demo view.',
		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'label',
				'bind:text': 'message'
			},
			{
				type: 'textbox',
				'bind:text': 'message'
			}
		]

		const selectableComponents: { name: string, model: any }[] = [
			{
				name: 'Label',
				model: {
					type: 'label',
					text: 'Hello, labels!'
				}
			},
			{
				name: 'Textbox',
				model: {
					type: 'textbox',
					text: 'Hello, textbox'
				}
			},
		]

		return {
			startingVariables,
			startingModels,
			selectableComponents
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
		title="Bind Variables"
		caption="Configure one or more variables to be bound to your components using the <span class='font-bold'>bind:</span> specifier. Multiple components can bind to the same variable!"
	/>
</template>
