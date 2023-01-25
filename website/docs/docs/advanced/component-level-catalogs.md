# Component-Level Catalogs

You can optionally provide a catalog object to [BloxComponents](/docs/api/components/blox-component) if you wish to override the settings you've used in [registerBlox(...)](/docs/api/composables/register-blox) (or, you can use this method if you don't wish to install Vue Blox app-wide, but remember to register the BloxComponent inside your component in that case).

```ts{24-26,31}
// App.vue
<script lang="ts">
import { defineComponent, watch, reactive } from 'vue'
import { BloxComponent } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {
		
		// Construct some variables to provide bound data to our props:
		const variables: any = reactive({
			someVariable: 'Hello, Variables!'
		})

		// Construct a view to render. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const view = {
			type: 'label',
			'bind:text': 'someVariable'
		}
		
		// Provide a catalog at the component-level:
		const catalog = {
			'label': MyLabelComponent
		}
		
		return {
			view,
			variables,
			catalog
		}
	},
})
</script>
```
```html{7}
<template>
	<main>
		<!-- Pass the view, variables and catalog to a BloxComponent for rendering -->
		<BloxComponent
			:view="view"
			:variables="variables"
			:catalog="catalog"
		/>
	</main>
</template>
```