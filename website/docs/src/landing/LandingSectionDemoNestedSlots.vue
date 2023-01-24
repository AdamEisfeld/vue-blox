<script lang="ts">
import { ComponentPublicInstance, defineComponent } from 'vue'
import LandingSectionDemo from '../landing/LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoNestedSlots',
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
			'gridColumns': 3,
		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'label',
				'text': 'Adjust grid columns:',
			},
			{
				type: 'stepper',
				'bind:value': 'gridColumns',
			},
			{
				type: 'grid',
				'bind:columns': 'gridColumns',
				'slot:children': [
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 1',
						},
					},
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 2',
						},
					},
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 3',
						},
					},
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 4',
						},
					},
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 5',
						},
					},
					{
						type: 'cell',
						'slot:content': {
							type: 'label',
							text: 'Cell 6',
						},
					},
				]
			},
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
				name: 'Cell',
				model: {
					type: 'cell',
				}
			},
			{
				name: 'Grid',
				model: {
					type: 'grid',
					columns: 3,
				}
			},
			{
				name: 'Stepper',
				model: {
					type: 'stepper',
					value: 0,
				}
			}
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
	<LandingSectionDemo class="bg-brand"
		:catalog="catalog"
		:isInverted="true"
		:isVariablesEnabled="true"
		:startingVariables="startingVariables"
		:startingModels="startingModels"
		:selectableComponents="selectableComponents"
		title="Nested Slots"
		caption="Use the <span class='font-bold'>slot:</span> specifier to insert child components into the slots of parent components."
	/>
</template>
