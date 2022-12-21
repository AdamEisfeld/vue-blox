# Key Plugins

Key plugins are responsible for reading a given key/value from the input view passed to [getBloxView(...)](/docs/api/composables/get-blox-view) and returning one or more props and/or slots to be passed to the resulting component. Vue Blox iterates over all of it's Key plugins for each key in an input view until it finds a plugin that returns some value for either props or slots. Internally, Vue Blox always falls back to lastly using it's slot, bind, and simple Key plugins to determine props/slots if no results are returned from installed Key plugins.

Create a Key plugin by creating a class that implements the [BloxKeyPluginInterface](/docs/api/interfaces/blox-key-plugin-interface) interface, returning some value from the **handleKey** function:

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

You can also pass Key plugins directly to the [getBloxView(...)](/docs/api/composables/get-blox-view) call, to be used on top of any globally registered Key plugins:

```ts
const view = getBloxView(inputView, inputBindings, [
	new MyKeyPlugin()
])
```