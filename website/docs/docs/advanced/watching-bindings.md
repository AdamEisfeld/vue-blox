# Watching Bindings

It can be useful to monitor your bindings as they are modified by the various injected components:

**App.vue:**
```ts
<script lang="ts">
import { defineComponent, watch } from 'vue'
import { BloxComponent, getBloxBindings, getBloxView } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		// Construct some variables to provide bound data to our props:
		const inputBindings: any = {
			someVariable: 'Hello, Variables!'
		}
		
		// Construct a JS object to render. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const inputView: any = {
			type: 'stack',
			'slot:children': [
				{
					type: 'heading',
					text: 'This is a nested heading.',
				},
				{
					type: 'label',
					'bind:text': 'someVariable',
				}
			]
		}

		// Parse the input bindings into a BloxBindings instance, and pass it to the getBloxView(...) call:
		const bindings = getBloxBindings(inputBindings)
		const view = getBloxView(inputView, bindings)

		// Watch bindings for changes:
		watch(Object.values(bindings.entries), () => {
			console.log('Changes have been made!')
		})
		
		return {
			view,
			bindings
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the view and bindings to a BloxComponent for rendering -->
		<BloxComponent :view="view" :bindings="bindings"/>
	</main>
</template>
```