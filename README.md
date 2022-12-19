
<img src="https://user-images.githubusercontent.com/2840242/207716387-7ff01edc-1718-4e4c-87d7-40fb917dd937.png" alt="VueBlox" width="200"/>

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/AdamEisfeld/5deff13e382d361bfceea173202bbc7a/raw/1c5992463931db5719d223737d9509e605f950d9/vue-blox__heads_main.json)
[![Netlify Status](https://api.netlify.com/api/v1/badges/49f89bf0-d9ef-4a2e-9c9d-8e62eb08bc8a/deploy-status)](https://app.netlify.com/sites/tangerine-belekoy-3f1174/deploys)

Vue Blox is a light-weight plugin for Vue 3 that allows you to render regular Javascript objects as Vue components.
If you've ever used Slack's [BlockKit API](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiZ3Ljc4vn7AhVGheAKHbCQB6QQFnoECA0QAQ&url=https://api.slack.com/block-kit&usg=AOvVaw3968Lct0SGECMdK_62GKu0), Vue Blox behaves similarly.

  
## Installation
Vue Blox is available as a node package. For the latest stable version, run:

```bash
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

### Render Blox

Obtain a JS object describing your desired component to render, pass it to getBloxView(...) to obtain a formatted view model ready for Vue Blox, then pass the formatted view model to a BloxComponent component via the view prop:

 **App.vue:**
```ts
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
```html
<template>
	<main>
		<!-- Pass the view model to a BloxComponent for rendering -->
		<BloxComponent :view="view"/>
	</main>
</template>
```

## Binding Props

You can optionally provide a second BloxBindings object to getBloxView(...) describing any variables you would like to expose to your components. These variables are obtained from the getBloxVariables(...) function and can be referenced within the views you provide to getBloxView(...) by prefixing a prop's name with 'bind:', and setting the prop's value to the name of the variable you wish to bind to. For example:

 **App.vue:**
```ts
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
			type: 'heading',
			'bind:text': 'someVariable'
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

Bound props will automatically update the value in the entries of the bindings returned from getBloxBindings(...) if the component they are provided to emits an 'update:[propName]' event matching the prop's name bound to. This allows you to share reactive data across multiple components in your Vue Blox, and react to changes in that data by monitoring the values in the bindings.

## Providing Slots

You can optionally provide nested objects to be inserted into slots of your component by including a key/value pair where the key is in the format 'slot:[slotName]' and the value is either a single nested object to be rendered or an array of objects to be rendered. If no slot name is provided, the 'default' slot will be used in the parent component.

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

Then you might insert nested JS objects into the 'children' slot like so:

 **App.vue:**
```ts
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

Note that bindings are automatically exposed to all slots of a BloxComponent, recursively. In the above example, the second label component we put in the stack has it's text prop bound to the 'someVariable' entry in our bindings.

## Using Mustache

Vue Blox supports the use of mustache templates in both the values for variables you provide to Vue Blox, and the values you provide for props within models passed to Vue Blox. To enable mustache support, you will need to install the popular mustache.js npm module:

```bash
npm install mustache --save
```

For example, you might grab the "name" and "age" variable and use them in the "text" prop of a label component:

```ts
// Construct some variables to provide data to our props:
const inputVariables: any = {
  name: 'Bruce Banner',
  age: 42
}

// Construct a JS object to render. We use mustache to extract values from our variables and inject them directly into the text passed to the label.
const inputView: any = {
  type: 'label',
  text: '{{ name }} is {{ age }} years old.'
}
```

Or, you might compute this text as a variable itself:

```ts
// Construct some variables to provide data to our props:
const inputVariables: any = {
  name: 'Bruce Banner',
  age: 42,
  summary: '{{ name }} is {{ age }} years old.'
}

// Construct a JS object to render. We use mustache to extract values from our variables and inject them directly into the text passed to the label.
const inputView: any = {
  type: 'label',
  text: '{{ summary }}'
}
```

## Watching Binding Changes

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

## Component-Level Catalogs

You can optionally provide a BloxCatalog object to BloxComponents if you wish to override the settings you've used in registerBlox(...) (or, you can use this method if you don't wish to install Vue Blox app-wide, but remember to register the BloxComponent in your component in that case).

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

## Plugin Support

Vue Blox is extendable through plugins. In fact, Vue Blox uses it's plugin system internally for handling slots, bindings, and mustache templates. There are two kinds of plugins available:

### Key Plugins

Key plugins are responsible for reading a given key/value from the input view passed to getBloxView(...) and returning one or more props and/or slots to be passed to the resulting component. Vue Blox iterates over all of it's Key plugins for each key in an input view until it finds a plugin that returns some value for either props or slots. Internally, Vue Blox always falls back to lastly using it's slot, bind, and simple Key plugins to determine props/slots if no results are returned from installed Key plugins.

Create a Key plugin by creating a class that implements the BloxKeyPluginInterface interface, returning some value from the handleKey function:

```ts
handleKey(value:  any, variables:  Record<string, any>):  any
```

Then provide this plugin to the registerBlox(...) call before using Vue Blox in your app:

```ts
const app = createApp(App)

const blox = registerBlox({
	catalog: {
		...
	},
	keyPlugins: [
		new MyKeyPlugin()
	]
})

app.use(blox)

app.mount('#app')
```

You can also pass Key plugins directly to the getBloxView(...) call, to be used on top of any globally registered Key plugins:

```ts
const view = getBloxView(inputView, inputBindings, [
	new MyKeyPlugin()
])
```

### Value Plugins

Value plugins are responsible for modifying the value of a prop at run-time when the component needs it, and are stackable. For example, Vue Blox uses an internal Value plugin for rendering mustache templates.

Create a Value plugin by creating a class that implements the BloxValuePluginInterface interface, returning some value from the handleValue function:

```ts
handleValue(value:  any, variables:  Record<string, any>):  any
```

Then provide this plugin to the registerBlox(...) call before using Vue Blox in your app:

```ts
const app = createApp(App)

const blox = registerBlox({
	catalog: {
		...
	},
	valuePlugins: [
		new MyValuePlugin()
	]
})

app.use(blox)

app.mount('#app')
```

You can also pass Value plugins directly to your BloxComponent as a prop, to be used on top of any globally registered Value plugins:

```
<BloxComponent :view="view" :valuePlugins="[new MyValuePlugin()]"/>
```
