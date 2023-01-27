# BloxPluginInterface

## Description

Implement this interface to provide additional functionality in determining how to parse / handle a given value of a view before passing it to the component as a prop.

Plugins should determine if the current key/value pair needs to be parsed by the plugin early on, and return if not.

Plugins can call the setProp() / setSlot() functions on the context provided to modify the props / slots of the component rendered for the context.

Plugins should throw errors if the provided input is malformed. Errors will be caught by the [BloxComponent](/docs/api/components/blox-component) and emitted via the component's handleErrors() event.

:::tip
Register plugins globally via the registerBlox(...) call.
:::

## Functions

```ts
run({
	context: BloxContext,
	key: string,
	value: any,
	variables: any,
	buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined
}): void
```

### Parameters

- **context:** [BloxContext](/docs/api/classes/blox-context)

The current context being computed. Call setProp() or setSlot() on the context from your plugin to modify the resulting props/slots passed to the final component.

- **key:** ```string```

The key of the field in the view being computed.

- **value:** ```string```

The value of the field in the view being computed.

- **variables:** ```string```

Any variables provided with the view. If variables are reactive, you can modify them from here.

- **buildContext(```{ view: any, variables: any }```):**

A function to invoke from your plugin in order to build a nested context within this context. Useful when you wish to generate components to insert into a slot of the current context.
