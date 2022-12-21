# Getting Started

## Installation
Vue Blox is available as a node package. For the latest stable version, run:

```bash
npm install vue-blox
```

## Create Your Components

Create one or more standard Vue components to map to Vue Blox. Here, we create a MyHeadingComponent that displays a "text" prop inside h1 tags, and a MyLabelComponent that displays a "text" prop inside span tags:

**MyHeadingComponent:**

```ts
// MyHeadingComponent.vue
<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'MyHeadingComponent',
	components: {},
	props: {
		text: {
			type: String,
			required: false,
			default: undefined
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>
```
```html	
<template>
	<h1>
		{{ text }}
	</h1>
</template>
```

**MyLabelComponent:**

```ts
// MyLabelComponent.vue
<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
	name: 'MyLabelComponent',
	components: {},
	props: {
		text: {
			type: String,
			required: false,
			default: undefined
		}
	},
	emits: [],
	setup() {
		return {}
	},
})

</script>
```
```html
<template>
	<span>
		{{ text }}
	</span>
</template>
```

## Install the Plugin

Register your components with Vue Blox globally using the [registerBlox(...)](/docs/api/composables/register-blox) composable with Vue's plugin API.

The strings in the catalog keys represent the values Vue Blox will look for in the "type" keys on any objects you pass to the composable [getBloxView(...)](/docs/api/composables/get-blox-view) function later on. So, in this example, we would need to provide an object with a "type" property set to either "heading" or "label" in order for the corresponding component to be rendered.

```ts{2,3-5,8-14,16}
import App  from  './App.vue'
import { createApp } from  'vue'
import { registerBlox } from  'vue-blox'
import MyHeadingComponent from './MyHeadingComponent.vue'
import MyLabelComponent from './MyLabelComponent.vue'

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		'heading': MyHeadingComponent,
		'label': MyLabelComponent
	}
})

app.use(blox)
app.mount('#app')
```

## Obtain a [BloxView](/docs/api/classes/blox-view) view

Obtain a JS object (called an "input view" in the Vue Blox world) describing your desired component to render (ensuring it at least has a "type" property with a string value matching one of the types you mapped via [registerBlox(...)](/docs/api/composables/register-blox) earlier). In this example, we will construct the object directly within the App component's setup(), but this could just as easily come from an API call, or be built in real-time based on user interactions.

Any other fields in your input view will be passed to the corresponding component as props. In this example, we have an additional "text" property of "Hello, Blox!", which will be passed to the rendered MyHeadingComponent's text prop at runtime.

Then, pass this input view to the [getBloxView(...)](/docs/api/composables/get-blox-view) composable to obtain a [BloxView](/docs/api/classes/blox-view) instance, ready to be passed to a [BloxComponent](/docs/api/components/blox-component) in it's props.

```ts{3,13-16,19,22}
// App.vue
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxComponent, getBloxView } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {
		
		// Construct a JS object to render
		const inputView: any = {
			type: 'heading',
			text: 'Hello, Blox!'
		}

		// Parse the input view into a view model ready for Vue Blox:
		const view = getBloxView(inputView)

		return {
			view
		}
	},
})
</script>
```
```html{4}
<template>
	<main>
		<!-- Pass the view model to a BloxComponent for rendering -->
		<BloxComponent :view="view"/>
	</main>
</template>
```
