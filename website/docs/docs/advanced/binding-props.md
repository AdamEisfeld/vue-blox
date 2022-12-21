# Binding Props

Rendering objects to their corresponding components is fun, but not very interactive. What if there was a way to allow clients to modify the values provided to their components, and monitor those changes in order to...
- Update some other part of the UI
- Store their inputs to be sent to an API call
- Something else?

The [getBloxView(...)](/docs/api/composables/get-blox-view) composable accepts a second parameter called "bindings", of type [BloxBindings](/docs/api/classes/blox-bindings). You instantiate bindings via the [getBloxBindings(...)](/docs/api/composables/get-blox-bindings) composable, passing in a regular JS object containing key/value pairs of the props you wish to monitor and the initial values to provide to those props. In return, you receive a [BloxBindings](/docs/api/classes/blox-bindings) instance that can be passed to [getBloxView(...)](/docs/api/composables/get-blox-view), which will ensure the props that mach those bindings are made 2-way reactive.

Under the hood, this means an additional prop is added for each key in your input view who's name starts with **'bind:'**, with the prop name set to 'update:[propNameInCamelCase]'. If the your Vue component emits this event (as it would for normal v-model implementations), then Vue Blox will handle reacting to this event and updating the value in the bindings object.

For example, say we had this simple Vue component that:
- Renders an input box
- Accepts a "text" prop for the text to display in the input box
- Emits an "update:text" event when the text in the input box is modified:

```ts
// MyInputComponent.vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MyInputComponent',
	components: undefined,
	props: {
		text: {
			type: [String, Number, Boolean, Array],
			required: false,
			default: null,
		},
	},
	emits: [
		'update:text',
	],
	setup(props, { emit }) {
		const emitUpdateText = (event: any) => {
			emit('update:text', event.target.value)
		}
		return {
			emitUpdateText,
		}
	},
})

</script>
```
```html	
<template>
	<input type="text" :value="text" @input="emitUpdateText">
</template>
```

And you mapped this component to the "input" type in Vue Blox:

```ts{4,10}
import App  from  './App.vue'
import { createApp } from  'vue'
import { registerBlox } from  'vue-blox'
import MyInputComponent from './MyInputComponent.vue'

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		'input': MyInputComponent,
	}
})

app.use(blox)
app.mount('#app')
```

You could then construct an "input bindings" object (any JS object) containing a "message" key/value pair, construct a BloxBindings object from this input, and pass this bindings object to [getBloxView(...)](/docs/api/composables/get-blox-view) along with an input view that has a **"bind:text"** key/value pair with a value of **"message"**:

```ts{3,4,12-15,24,27-31,35}
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
			message: 'This is a bound prop' // Initial value for "text" prop
		}

		// Construct a JS object to render our input. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const inputView: any = {
			type: 'input',
			'bind:text': 'message'
		}

		// Parse the input bindings into a BloxBindings instance, and pass it to the getBloxView(...) call:
		const bindings = getBloxBindings(inputBindings)
		const view = getBloxView(inputView, bindings)

		// Now we can watch our bindings object to be notified as the user enters text into our input component:
		watch(bindings.entries['message'], () => {
			const currentValue = bindings.entries['message'].value
			console.log(`Message Updated: ${currentValue}`)
		})

		return {
			view,
			bindings
		}
	},
})
</script>
```
```html{5}
<template>
	<main>
		<!-- A MyInputComponent will be rendered. As the user enters text,
		binding.entries['message'] will be updated. -->
		<BloxComponent :view="view" :bindings="bindings"/>
	</main>
</template>
```