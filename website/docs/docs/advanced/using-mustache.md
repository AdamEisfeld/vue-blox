# Using Mustache <div class="animate-bounce inline-block"><span>{</span></div>

Install the Vue Blox Mustache npm package to enable mustache templates in Vue Blox.

Vue Blox Mustache supports the use of mustache templates in both the values for variables you provide to Vue Blox, and the values you provide for props within models passed to Vue Blox. To enable mustache support, install the vue-blox-mustache npm package first:

```bash
npm install vue-blox-mustache
```

Then, you will need to install the popular mustache.js npm module:

::: warning
At the time of writing, the latest npm version of mustache does not seem to build properly for browsers. You will need to either use a CDN to grab the script via regular ```<script>``` tags, or use version 4.1.0:
:::

```bash
npm install mustache@4.1.0
```

Finally, pass the mustache plugin to Vue Blox:

```ts
import { registerBlox } from 'vue-blox'
import { getPluginMustache } from 'vue-blox-mustache'

// ...

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		...
	},
	valuePlugins: [
		getPluginMustache()
	]
})

app.use(blox)

app.mount('#app')

```

::: tip
You can instead pass the mustache plugin directly to your BloxComponent via the valuePlugins array prop, if you don't want to register the plugin globally.
:::

For example, you might grab the "name" and "age" variable and use them in the "text" prop of a label component:

```ts
// Construct some variables to provide data to our props:
const inputBindings: any = {
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
const inputBindings: any = {
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