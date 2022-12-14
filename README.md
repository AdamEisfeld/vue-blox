# Vue Blox

[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/AdamEisfeld/5deff13e382d361bfceea173202bbc7a/raw/1c5992463931db5719d223737d9509e605f950d9/vue-blox__heads_main.json)]

Vue Blox is a light-weight plugin for Vue 3 that allows you to render regular Javascript objects as Vue components.

If you've ever used Slack's [BlockKit API](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiZ3Ljc4vn7AhVGheAKHbCQB6QQFnoECA0QAQ&url=https://api.slack.com/block-kit&usg=AOvVaw3968Lct0SGECMdK_62GKu0), Vue Blox behaves similarly.

  
## Installation


Vue Blox is available as a node package. For the latest stable version, run:


```
npm install vue-blox
```

## Getting Started

### Create Your Components

Create one or more standard Vue components to map to Vue Blox. Here, we create a MyHeadingComponent that displays a "text" prop inside h1 tags, and a MyLabelComponent that displays a "text" prop inside span tags:

 1. **MyHeadingComponent.vue:**

```ts
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

 2. **MyLabelComponent.vue:**
```ts
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

### Install the Plugin

Register your components with Vue Blox globally using the plugin API:

```ts
import App  from  './App.vue'
import { createApp } from  'vue'
import { createBlox } from  'vue-blox'
import MyHeadingComponent from './MyHeadingComponent.vue'
import MyLabelComponent from './MyLabelComponent.vue'

const app = createApp(App)

const blox = createBlox({
	'heading': MyHeadingComponent,
	'label': MyLabelComponent
})

app.mount('#app')
```

### Render Blox

Obtain a JS object describing your desired component to render, pass it to useBlox(...) to obtain a formatted model ready for Vue Blox, then pass the formatted model to a BloxView component via the model prop:

 **App.vue:**
```ts
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxView, useBlox } from '../src'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {
		
		// Construct a JS object to render
		const inputModel: any = {
			type: 'heading',
			text: 'Hello, Blox!'
		}

		// Parse the input model into a model ready for Vue Blox:
		const { model } = useBlox(inputModel)

		return {
			model
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the model to a BloxView for rendering -->
		<BloxView :model="model"/>
	</main>
</template>
```

## Binding Props

You can optionally provide a second Javascript object to useBlox(...) describing any variables you would like to expose to your components. These variables can be referenced within the view models you provide to Vue Blox by prefixing a prop's name with 'bind:', and setting the prop's value to the name of the variable you wish to bind to. For example:

 **App.vue:**
```ts
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxView, useBlox } from '../src'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {
		
		
		// Construct some variables to provide bound data to our props:
		const inputVariables: any = {
			someVariable: 'Hello, Variables!'
		}

		// Construct a JS object to render. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const inputModel: any = {
			type: 'heading',
			'bind:text': 'someVariable'
		}

		// Parse the input model and variables into a model and variables ready for Vue Blox:
		const { model, variables } = useBlox(inputModel, inputVariables)

		return {
			model,
			variables
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the model to a BloxView for rendering -->
		<BloxView :model="model" :variables="variables"/>
	</main>
</template>
```

Bound props will automatically update the value in the variables returned from useBlox(...) if the component they are provided to emits an 'update:[propName]' event. This allows you to share reactive data across multiple components in your Vue Blox, and react to changes in that data by monitoring the values in the variables returned from useBlox(...).

## Providing Slots

You can optionally provide nested objects to be inserted into slots of your component by including a key/value pair where the key is in the format 'slot:[slotName]' and the value is either a single nested object to be rendered or an array of objects to be rendered.

For example, if you had a component named MyStackComponent, which used flex-box to stack components vertically in a slot named 'children':

 **MyStackComponent.vue:**
```ts
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
import { createBlox } from  'vue-blox'
import MyStackComponent from './MyStackComponent.vue'
import MyHeadingComponent from './MyHeadingComponent.vue'
import MyLabelComponent from './MyLabelComponent.vue'

const app = createApp(App)

const blox = createBlox({
	'stack': MyStackComponent,
	'heading': MyHeadingComponent,
	'label': MyLabelComponent
})

app.mount('#app')
```

Then you might insert nested JS objects into the 'children' slot like so:

**App.vue:**
```ts
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxView, useBlox } from '../src'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		// Construct a JS object to render:
		const inputModel: any = {
			type: 'stack',
			'slot:children': [
				{
					type: 'heading',
					text: 'This is a nested heading.',
				},
				{
					type: 'label',
					text: 'This is a nested label.',
				}
			]
		}

		// Parse the input model and variables into a model and variables ready for Vue Blox:
		const { model, variables } = useBlox(inputModel, inputVariables)

		return {
			model,
			variables
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the model to a BloxView for rendering -->
		<BloxView :model="model" :variables="variables"/>
	</main>
</template>
```

## Watching Variable Changes

It can be useful to monitor the variables within your BloxView as they are modified by the various injected components:

**App.vue:**
```ts
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxView, useBlox } from '../src'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {
		
		
		// Construct some variables to provide bound data to our props:
		const inputVariables: any = {
			someVariable: 'Hello, Variables!'
		}

		// Construct a JS object to render. We bind the 'text' prop to the value of 'someVariable' in our variables:
		const inputModel: any = {
			type: 'heading',
			'bind:text': 'someVariable'
		}

		// Parse the input model and variables into a model and variables ready for Vue Blox:
		const { model, variables } = useBlox(inputModel, inputVariables)

		// Watch variables for changes:
		watch(Object.values(variables), () => {
			console.log('Changes have been made!')
		})
		
		return {
			model,
			variables
		}
	},
})
</script>
```
```html
<template>
	<main>
		<!-- Pass the model to a BloxView for rendering -->
		<BloxView :model="model" :variables="variables"/>
	</main>
</template>
```
