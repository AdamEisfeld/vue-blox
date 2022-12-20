# BloxValuePluginInterface

## Description

Implement this interface to provide additional functionality in computing the final values passed to injected components of a [BloxComponent](/docs/api/components/blox-component).

:::tip
Register plugins globally via the registerBlox(...) call.
:::

## Example

Below is an example of a class adopting this interface. This class looks for values that contain certain emoji strings like '[smile] or [frown] and replaces them with the corresponding Unicode emoji symbol.

```ts
// EmojiValuePlugin.ts

import { BloxValuePluginInterface } from 'vue-blox'

export class EmojiValuePlugin implements BloxValuePluginInterface {

	handleValue(value: any, variables: Record<string, any>): any {

		if (typeof value !== 'string') {
			return value
		}

		const result = (value as string)
			.replace(/\[smile\]/g, '😊')
			.replace(/\[frown\]/g, '🙁')
			.replace(/\[cool\]/g, '😎')
			.replace(/\[nerd\]/g, '🤓')

		return result
	}

}
```

This plugin would then be provided to a [BloxComponent](/docs/api/components/blox-component) via the **valuePlugins** prop.

```ts{4,14,19-21,25}
<script lang="ts">
import { defineComponent } from 'vue'
import { BloxComponent, getBloxBindings, getBloxView } from 'vue-blox'
import { EmojiValuePlugin } from './EmojiValuePlugin'

export default defineComponent({
	name: 'App',
	components: {},
	props: {},
	setup() {

		const inputView: any = {
			type: 'label',
			'text': 'Turn that [frown] upside down [smile]'
		}

		const view = getBloxView(inputView, bindings)

		const plugins = [
			new EmojiValuePlugin()
		]

		return {
			view,
			plugins
		}
	},
})
</script>
```

```html{3}
<template>
	<main>
		<BloxComponent :view="view" :valuePlugins="plugins"/>
	</main>
</template>
```
