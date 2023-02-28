# Functions As Props

You can optionally provide JS functions as values for your views. They will be delivered to the components as any other kind of prop. If you set the prop name to the name of an event emitted by your component (prefixed with "on", in camelCase), then your function will be fired when the component emits the event.

For example, if you had a button component that emits a 'didClick' event on click:

```ts
// MyInputComponent.vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MyButtonComponent',
	components: undefined,
	props: {
		title: {
			type: String,
			required: false,
			default: null,
		},
	},
	emits: [
		'didClick',
	],
	setup(props, { emit }) {
		const emitDidClick = () => {
			emit('didClick')
		}
		return {
			emitDidClick,
		}
	},
})

</script>
```
```html	
<template>
	<button @click="emitDidClick()">
		{{ title }}
	</button>
</template>
```

And you mapped this component to the "button" type in Vue Blox:

```ts{4,10}
import App  from  './App.vue'
import { createApp } from  'vue'
import { registerBlox } from  'vue-blox'
import MyButtonComponent from './MyButtonComponent.vue'

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		'button': MyButtonComponent,
	}
})

app.use(blox)
app.mount('#app')
```

You could then construct a view object to render this button, with a function to execute when the 'didClick' event is fired on click:

```ts{16-18}
// App.vue
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { BloxComponent } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		// Construct a JS object to render our input. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const view = {
			'type': 'button',
			'title': 'Click Me',
			'onDidClick': () => {
				console.log('The user clicked the button!')
			}
		}

		return {
			view,
			variables
		}
	},
})
</script>
```
```html{4}
<template>
	<main>
		<!-- A MyButtonComponent will be rendered. When the user clicks the button, a message will be logged. -->
		<BloxComponent :view="view"/>
	</main>
</template>
```