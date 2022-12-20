<script lang="ts">
import { defineComponent } from 'vue'
import { BloxCatalog } from 'vue-blox'
import LandingSectionDemo from '../landing/LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoMustache',
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
			'name': 'Bruce Banner',
			'job': 'Avenger',
			age: 42,
			quotes: [
				'Hulk, smash!',
				'You wouldn\'t want me to get angry.'
			],
			'summary': '{{ name }} is {{ age }} years old, and works as an {{ job }}.',
		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'heading',
				'text': '{{ name }}\'s dating profile:'
			},
			{
				type: 'profile',
				url: 'hulk.jpg',
				name: '{{ name }}'
			},
			{
				type: 'label',
				'text': '<b>{{ name }}\'s Summary:</b><br>{{ summary }}'
			},
			{
				type: 'label',
				'text': '<b>Favourite Quotes:</b><br><ol class="list-disc list-inside">{{#quotes}}<li>{{.}}</li>{{/quotes}}</ol>'
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
				name: 'Profile Pic',
				model: {
					type: 'profile'
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
		title="Mustache Support"
		caption="For string-typed props and variables, insert mustache tags to reference values from other variables."
	/>
</template>
