# getBloxCatalog(...)

## Description

Constructs a [BloxCatalog](/docs/api/classes/blox-catalog) from a map of strings to Vue components. The strings represent possible options for the "type" field of an object used to construct a [BloxView](/docs/api/classes/blox-view).

## Parameters

- **components:** ```Record<string, ComponentPublicInstance<any>>```

A map of Vue components to type names to use when determining which component to render in a BloxComponent.

## Returns

- A new [BloxCatalog](/docs/api/classes/blox-catalog) instance.

## Example

```ts
import { getBloxCatalog } from 'vue-blox'
import LabelComponent from './components/LabelComponent.vue'
import ImageComponent from './components/ImageComponent.vue'

const catalog: BloxCatalog = getBloxCatalog({
	'label': LabelComponent,
	'image': ImageComponent
})
```