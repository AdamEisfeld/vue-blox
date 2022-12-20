# BloxKeyPluginInterface

## Description

Implement this interface to provide additional functionality in determining how to parse / handle a given value of a view before passing it to the component as a prop.

:::tip
Register plugins globally via the registerBlox(...) call.
:::

## Example

Below is an example of a class adopting this interface. This class looks for keys that start with **'randomize:'**. If found, the remaining text in the key will refer to the prop to put the value into, and the value of the key will refer to an array in the [BloxBindings](/docs/api/classes/blox-bindings) being used to obtain a random value from.

```ts
// RandomizeKeyPlugin.ts

import {
	BloxKeyPluginInterface,
	BloxBindings,
	BloxView,
	BloxError } from 'vue-blox'

export class RandomizeKeyPlugin implements BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined {
		
		if (!key.startsWith('randomize:')) {
			// This isn't an applicable key, so return early.
			return undefined
		}

		// Ensure we're dealing with a string value
		if (typeof value !== 'string') {
			throw new BloxError(
				'Randomize parsing failed.',
				`The value for the randomize key must be a string.`,
				{
					key, value
				}
			)
		}

		// 1. Get the prop name
		const propName = key.substring('randomize:'.length, key.length)

		// Ensure the prop name is not of zero length
		if (propName.length === 0) {
			throw new BloxError(
				'Randomize parsing failed.',
				`The prop name for the randomize key must be a string with length > 0.`,
				{
					key, value
				}
			)
		}

		// 2. Get the value the user is attempting to grab a random value from
		const boundValue = bindings.entries[value]?.value ?? undefined
		if (!boundValue) {
			return undefined
		}

		// 3. If we have a value, ensure the value is an array
		if (!Array.isArray(boundValue)) {
			throw new BloxError(
				'Randomize parsing failed.',
				`The value for the randomize key must be an array.`,
				{
					key, value
				}
			)
		}

		const randomIndex = Math.floor(Math.random()*boundValue.length)
		const randomValue = boundValue[randomIndex]

		const props: Record<string, any> = {}
		props[propName] = randomValue

		return {
			props: props,
			slots: undefined,
		}
		
	}

}
```

This plugin would then be provided to the [getBloxView(...)](/docs/api/composables/get-blox-view) call:


```ts{4,23,29}
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxComponent, getBloxBindings, getBloxView } from 'vue-blox'
import { RandomizeKeyPlugin } from './RandomizeKeyPlugin'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		const inputBindings = {
			'names': [
				'Adam',
				'Fred',
				'Jane'
			]
		}

		const inputView = {
			{
				type: 'label',
				'randomize:text': 'names'
			}
		}

		const bindings = getBloxBindings(inputBindings)
		const view = getBloxView(inputView, bindings, [
			new RandomizeKeyPlugin()
		])

		return {
			view,
			bindings
		}
	},
})
</script>
```
```html{3}
<template>
	<main>
		<BloxComponent :view="view" :bindings="bindings"/>
	</main>
</template>
```
