# Error Handling

Typically, any errors thrown by Vue Blox will be of the type [BloxError](/docs/api/classes/blox-error). You can inspect any thrown error to see if it is a [BloxError](/docs/api/classes/blox-error) via the asBloxError() static function:

## BloxError

```ts
import { BloxError } from 'vue-blox'

// ...

try {
	const view = getBloxView(...)
} catch(error) {
	const bloxError = BloxError.asBloxError(error)
	if (bloxError) {
		// Inspect the blox error properties for more info
		console.error(bloxError.message)
		console.error(bloxError.debugMessage)
		console.error(bloxError.context)
	}
}
```

## Component Errors

For any errors thrown from within a [BloxComponent](/docs/api/components/blox-component), you can optionally provide a function for the component's **on:error** event:


```html
// Respond to errors

<BloxComponent
	:catalog="catalog"
	:view="view"
	:bindings="bindings"
	:valuePlugins="valuePlugins"
	@on:error="(error: any) => handleError(error)"
/>
```

## Catch All

Vue also provides the app.config.errorHandler mechanism if you'd like to implement a sort of catch-all process:

```ts
const app = createApp(...)

// ...

app.config.errorHandler = (error: any) => {
	const bloxError = BloxError.asBloxError(error)
	if (bloxError) {
		// Inspect the blox error properties for more info
		console.error(bloxError.message)
		console.error(bloxError.debugMessage)
		console.error(bloxError.context)
	} else {
		// Fallback
		console.error(error)
	}
}
```