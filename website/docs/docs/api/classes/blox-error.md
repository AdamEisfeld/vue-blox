# BloxError

This is a convenience extension of the Error class, used internally by Vue Blox when throwing errors. You can inspect the user-friendly message, the more detailed debugMessage, or the optional context object for more information when a failure occurs.

You can listen for these errors by registering a callback on your BloxComponent's on:error event:

```ts{5,19-29,33}
// App.vue
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { BloxComponent } from 'vue-blox'
import { BloxError } from 'vue-blox'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		// Construct a view
		const view = {
			type: 'input',
			'bind:text': 'message'
		}

		// Construct a callback for errors
		const onError = (error: Error) => {
			const bloxError = BloxError.asBloxError(error)
			if (bloxError) {
				console.error(bloxError.message)
				console.error(bloxError.debugMessage)
				console.error(bloxError.context)
			} else {
				console.log(error)
			}
		}

		return {
			view,
			onError
		}
	},
})
</script>
```
```html{4}
<template>
	<main>
		<!-- Listen for errors -->
		<BloxComponent :view="view" @on:error="onError"/>
	</main>
</template>
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