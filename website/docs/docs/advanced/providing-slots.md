# Providing Slots

You can optionally provide nested objects to be inserted into slots of your component by including a key/value pair where the key is in the format 'slot:[slotName]' and the value is either a single input view to be rendered or an array of input views to be rendered. If no slot name is provided, the 'default' slot will be used in the parent component.

For example, if you had a component named MyStackComponent, which used flex-box to stack components vertically in a slot named 'children':

 **MyStackComponent:**
```ts
// MyStackComponent.vue
<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'MyStackComponent',
	components: {},
	props: {},
	emits: [],
	setup() {
		return {}
	},
})

</script>
```
```html
<template>
	<div class="container">
		<slot name="children"></slot>
	</div>
</template>
```
```css
<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
```

And you mapped this component to the 'stack' type in Vue Blox:

```ts
import App  from  './App.vue'
import { createApp } from  'vue'
import { registerBlox } from  'vue-blox'
import MyStackComponent from './MyStackComponent.vue'
import MyHeadingComponent from './MyHeadingComponent.vue'
import MyLabelComponent from './MyLabelComponent.vue'

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		'stack': MyStackComponent,
		'heading': MyHeadingComponent,
		'label': MyLabelComponent
	}
})

app.use(blox)
app.mount('#app')
```

Then you might insert nested input views into the 'children' slot like so:

 **App.vue:**
```ts{19-28}
<script lang="ts">
import { defineComponent } from 'vue'
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

Note that bindings are automatically exposed to all slots of a [BloxComponent](/docs/api/components/blox-component), recursively. In the above example, the second label component we put in the stack has it's text prop bound to the 'someVariable' entry in our bindings.