# Component-Level Catalogs

You can optionally provide a [BloxCatalog](/docs/api/classes/blox-catalog) object to [BloxComponents](/docs/api/components/blox-component) if you wish to override the settings you've used in [registerBlox(...)](/docs/api/composables/register-blox) (or, you can use this method if you don't wish to install Vue Blox app-wide, but remember to register the BloxComponent inside your component in that case).

```ts
// App.vue
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
			type: 'label',
			'bind:text': 'someVariable'
		}

		// Parse the input bindings into a BloxBindings instance, and pass it to the getBloxView(...) call:
		const bindings = getBloxBindings(inputBindings)
		const view = getBloxView(inputView, bindings)
		
		// Provide a catalog at the component-level:
		const catalog = getBloxCatalog({
			'label': MyLabelComponent
		})
		
		return {
			view,
			bindings,
			catalog
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the view and bindings to a BloxComponent for rendering -->
		<BloxComponent :view="view" :bindings="bindings" :catalog="catalog"/>
	</main>
</template>
```