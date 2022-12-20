# getBloxView(...)

## Description

Constructs a [BloxView](/docs/api/classes/blox-view) from a regular JS object. The objects used to construct BloxView instances should have a "type" field, whos' value has been mapped to a component in a [BloxCatalog](/docs/api/classes/blox-catalog) provided to the [BloxComponent](/docs/api/components/blox-component) it will be rendered in.

## Parameters

- **inputView:** ```any```

The object to convert to a Vue Blox view model ready to be passed to a BloxComponent.

- **bindings?:** [BloxBindings[]](/docs/api/classes/blox-bindings)

An optional BloxBindings instance of reactive variables to provide to the BloxComponent.

- **plugins?:** [BloxKeyPluginInterface[]](/docs/api/interfaces/blox-key-plugin-interface)

An optional array of processing plugins to use before Vue Blox carries out it's processing. Plugins allow you to add your own processing logic for new key types.

## Returns

- A new [BloxView](/docs/api/classes/blox-view) instance.

## Example

```ts
import { getBloxView } from 'vue-blox'

const inputView: any = {
	type: 'label',
	text: 'Hello, Vue Blox!'
}

const view: BloxView = getBloxView({
	inputView
})
```