# Error Handling

Typically, any errors thrown by Vue Blox will happen during plugin evaluation. These errors are caught by the [BloxComponent](/docs/api/components/blox-component) and stored in an array of type ```{ view: any, error: Error }[]```, emitted from the component's handleErrors() event whenever any are detected.

You can inspect each result's "view" property in the handleErrors() callback, which will be a copy of the view (or subview in the case of slots) you provided to the [BloxComponent](/docs/api/components/blox-component).

```ts
const handleErrors = (errors: { view: any, error: Error }[]) => {
	console.error(JSON.stringify(errors))
}
```
```html
// Respond to errors

<BloxComponent
	:catalog="catalog"
	:view="view"
	:variables="variables"
	:plugins="plugins"
	@on:handleErrors="(errors) => handleErrors(errors)"
/>
```
