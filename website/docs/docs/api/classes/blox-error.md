# BloxError

This is a convenience extension of the Error class, used internally by Vue Blox when throwing errors. You can inspect the user-friendly message, the more detailed debugMessage, or the optional context object for more information when a failure occurs.

A convenience function for determining if an error is a BloxError is provided via the static asBloxError(...) function.

```ts
import { BloxError } from 'vue-blox'

// ...

try {
	const view = getBloxView(...)
} catch(error) {
	const bloxError = BloxError.asBloxError(error)
	if (bloxError) {
		console.error(bloxError.message)
		console.error(bloxError.debugMessage)
		console.error(bloxError.context)
	}
}
```

## Properties

- **message:** ```string```

A user-friendly message to display summarizing the error.

- **debugMessage:** ```string```

A detailed message outlining what went wrong.

- **context:** ```any```

An object providing contexual data to what went wrong, if any.

- **isBloxError:** ```boolean```

A boolean that is always true for BloxError instances.

## Class Functions

### asBloxError(```error```): boolean
- **error:** ```any```

An object to check whether it is a BloxError or not.

- **returns:** ```boolean```

True if the error is a BloxError instance, false if not.