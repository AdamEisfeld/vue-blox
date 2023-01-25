# Binding Props

Rendering objects to their corresponding components is fun, but not very interactive. What if there was a way to allow clients to modify the values provided to their components, and monitor those changes in order to...
- Update some other part of the UI
- Store their inputs to be sent to an API call
- Something else?

The [BloxComponent](/docs/api/components/blox-component) component accepts a prop called "variables", which can be any set of key/value pairs you wish to provide to your components. It is recommended to make this variables object reactive via Vue's reactive() composable, which will ensure the props that are bound to these variables are made 2-way reactive (and will allow you to monitor these variables via Vue's watch() composable to receive callbacks as the user makes changes to them via your UI).

Under the hood, this means an additional prop is added for each key in your view who's name starts with **'bind:'**, with the prop name set to 'update:[prop-name]'. If the your Vue component emits this event (as it would for normal v-model implementations), then Vue Blox will handle reacting to this event and updating the value in the bindings object.

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

You could then construct a variables object (any JS object) containing a "message" key/value pair, and pass this object to [BloxComponent](/docs/api/components/blox-component)'s variables prop along with a view that has a **"bind:text"** key/value pair with a value of **"message"**:

```ts{3,4,12-15,20,24-27,31,35}
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
			message: 'This is a bound prop' // Initial value for "text" prop
		})

		// Construct a JS object to render our input. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const view = {
			type: 'input',
			'bind:text': 'message'
		}

		// Now we can watch our bindings object to be notified as the user enters text into our input component:
		watch(variables, () => {
			const currentValue = variables['message']
			console.log(`Message Updated: ${currentValue}`)
		})

		return {
			view,
			variables
		}
	},
})
</script>
```
```html{5}
<template>
	<main>
		<!-- A MyInputComponent will be rendered. As the user enters text,
		variables.message will be updated. -->
		<BloxComponent :view="view" :variables="variables"/>
	</main>
</template>
```