# getBloxBindings(...)

## Description

Constructs a [BloxBindings](/docs/api/classes/blox-bindings) from a plain JS object.

## Parameters

- **inputBindings:** ```any```

An optional object who's keys represent variable names, and values represent initial values for those variables.

## Returns

- A new [BloxBindings](/docs/api/classes/blox-bindings) instance.

## Example

```ts
import { getBloxBindings } from 'vue-blox'

const inputBindings: any = {
	someVariable: 'Hello, Variables!'
}

const bindings: BloxBindings = getBloxBindings(inputBindings)
```

:::tip
You can use Vue's watch() functionality on the result's entries dictionary values to determine when changes to variables have been made.
:::

```ts
import { watch } from 'vue'

const bindings = ...

watch(Object.values(bindings.entries), () => {
	console.log('Changes have been made!')
})
```
