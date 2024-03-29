# BloxComponent

A dynamic Vue component that renders an external Vue component based on the 'type' field on the view object provided in the component's props, and the component found for this type (if any) from the catalog object provided in the component's props.

## Props

- **catalog:** ```Record<string, ComponentPublicInstance<any>>```

The catalog to use when determining which component to inject. If no catalog is provided, the global catalog configured via registerBlox(...) will be used.

- **view:** ```any```

An object describing a view to render. The "type" field on the view will determine which component is rendered.

- **variables:** ```Record<string, any>```

Any variables that the view's props will be getting data from / sending data to.

- **plugins:** [BloxPluginInterface[]](/docs/api/interfaces/blox-plugin-interface)

An optional array of plugins to use on every prop value for the view before passing those prop values into the view's component. If no plugins are specified, then the global plugins configured via registerBlox(...) will be used, if any.

## Emits

- **handleErrors(```errors: { view: any, error: Error }[]```)**: This event is emitted from the component if Vue Blox ever encounters one or more fatal errors while computing the props/slots for a view. The errors object is an array of { view: any, error: Error }, where the view represents the view that caused the error, and the error is the error that was thrown.

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
// Pass the component reactive variables:

<BloxComponent
	:catalog="catalog"
	:view="view"
	:variables="variables"
/>
```

```html
// Pass the component plugins:

<BloxComponent
	:catalog="catalog"
	:view="view"
	:variables="variables"
	:plugins="plugins"
/>
```

```html
// Respond to errors

<BloxComponent
	:catalog="catalog"
	:view="view"
	:variables="variables"
	:plugins="plugins"
	@handleErrors="(errors: { view: any, error: Error }[]) => handleErrors(errors)"
/>
```