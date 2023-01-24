<script lang="ts">
import { ComponentPublicInstance, defineComponent } from 'vue'
import LandingSectionDemo from '../landing/LandingSectionDemo.vue'

export default defineComponent({
	name: 'LandingSectionDemoTryItOut',
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

		}

		const startingModels: Record<string, any>[] = [
			{
				type: 'label',
				text: 'Vue Blox is awesome!'
			},
			{
				type: 'image',
				url: './assets/demo/big-lebowski.gif'
			}
		]

		const selectableComponents: { name: string, model: any }[] = [
			{
				name: 'Label',
				model: {
					type: 'label',
					text: 'Hello, Label'
				}
			},
			{
				name: 'Image',
				model: {
					type: 'image',
					url: './assets/demo/hulk.jpg'
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
		:isVariablesEnabled="false"
		:startingVariables="startingVariables"
		:startingModels="startingModels"
		:selectableComponents="selectableComponents"
		title="Try It Out"
		caption="Use the buttons to insert new components, or directly modify the JSON in the text field below. Watch your changes update in real-time!"
	/>
</template>
