# Value Plugins

Value plugins are responsible for modifying the value of a prop at run-time when the component needs it, and are stackable. For example, Vue Blox uses an internal Value plugin for rendering mustache templates.

Create a Value plugin by creating a class that implements the [BloxValuePluginInterface](/docs/api/interfaces/blox-value-plugin-interface) interface, returning some value from the **handleValue** function:

```ts
handleValue(value:  any, variables:  Record<string, any>):  any
```

Then provide this plugin to the [registerBlox(...)](/docs/api/composables/register-blox) call before using Vue Blox in your app:

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

You can also pass Value plugins directly to your [BloxComponent](/docs/api/components/blox-component) as a prop, to be used on top of any globally registered Value plugins:

```
<BloxComponent :view="view" :valuePlugins="[new MyValuePlugin()]"/>
```