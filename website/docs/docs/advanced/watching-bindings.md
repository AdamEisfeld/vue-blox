# Watching Bindings

It can be useful to monitor your bindings as they are modified by the various injected components:

```ts{33-35}
// App.vue
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { BloxComponent } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		// Construct some variables to provide bound data to our props:
		const variables = reactive({
			someVariable: 'Hello, Variables!'
		})
		
		// Construct a view to render. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const view = {
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

		// Watch bindings for changes:
		watch(variables, () => {
			console.log('Changes have been made!')
		})
		
		return {
			view,
			variables
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the view and variables to a BloxComponent for rendering -->
		<BloxComponent :view="view" :variables="variables"/>
	</main>
</template>
```