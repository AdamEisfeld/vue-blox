# registerBlox(...)

## Description

Returns a Vue plugin to be passed to a Vue app via app.use(...). Registers one or more Vue components to a BloxCatalog globally. Registers the BloxComponent itself globally. All BloxComponents have access to this global BloxCatalog.

## Parameters

- **catalog:** ```Record<string, ComponentPublicInstance<any>>```

A map of strings to Vue components to use in the global catalog. The keys represent the "type" fields in objects passed to getBloxView(...).

- **keyPlugins?:** [BloxKeyPluginInterface[]](/docs/api/interfaces/blox-key-plugin-interface)

An optional array of key plugins to register globally.

- **keyPlugins?:** [BloxValuePluginInterface[]](/docs/api/interfaces/blox-value-plugin-interface)

An optional array of value plugins to register globally.

## Returns

An object adopting the appropriate install(...) function required for Vue's plugin system, to be passed to a Vue app's use(...) function.

## Example

```ts
import { registerBlox } from 'vue-blox'

const blox = registerBlox({
	catalog: {
		'label': LabelComponent,
		'image': ImageComponent,
	}
})

const app = ...
app.use(blox)
```