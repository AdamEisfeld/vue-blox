# BloxComponent

A dynamic Vue component that renders an external Vue component based on the 'type' field on the view object provided in the component's props, and the component found for this type (if any) from the catalog object provided in the component's props.

## Props

- **catalog:** [BloxCatalog](/docs/api/classes/blox-catalog)

The catalog to use when determining which component to inject. If no catalog is provided, the global catalog configured via registerBlox(...) will be used.

- **view:** [BloxView](/docs/api/classes/blox-view)

The view data to inject into the Vue component.

- **bindings:** [BloxBindings](/docs/api/classes/blox-bindings)

Any reactive variables that the view's props will be getting data from / sending data to.

- **valuePlugins:** [BloxValuePluginInterface[]](/docs/api/interfaces/blox-value-plugin-interface)

An optional array of value plugins to use on every prop value for the view before passing those prop values into the view's component. If no key plugins are specified, then the global key plugins configured via registerBlox(...) will be used, if any.

## Emits

- **on:error**: This event is emitted from the component if Vue Blox ever encounters a fatal error with the component. The error object may or may not be a [BloxError](/docs/api/classes/blox-error) instance.

## Example

```html
// Use the catalog registered globally via register-blox:

<BloxComponent
	:view="view"
/>
```

```html
// Use a custom catalog specific to this component:

<BloxComponent
	:catalog="catalog"
	:view="view"
/>
```

```html
// Pass the component reactive bindings:

<BloxComponent
	:catalog="catalog"
	:view="view"
	:bindings="bindings"
/>
```

```html
// Pass the component value plugins:

<BloxComponent
	:catalog="catalog"
	:view="view"
	:bindings="bindings"
	:valuePlugins="valuePlugins"
/>
```

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