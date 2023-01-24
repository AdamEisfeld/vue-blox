# BloxCatalog

Catalogs map type names (strings) to Vue components, and facilitate obtaining components from their internal map given a type name.

```ts
import { BloxCatalog } from 'vue-blox'

// ...

// Construct a new catalog

const catalog = {
	'label': SomeLabelComponent,
	'button': SomeButtonComponent
}

// Obtain the component mapped to a given type

const component = catalog.getComponentForType('button')
console.log(component.name) // SomeButtonComponent

```

## Properties

- **componentMap:** ```Record<string, ComponentPublicInstance<any>>```

A map of key/value pairs, where the keys represent possible values in the "type" field of input views to [getBloxView(...)](/docs/api/composables/get-blox-view), and the values represent Vue components to display for those corresponding types.
