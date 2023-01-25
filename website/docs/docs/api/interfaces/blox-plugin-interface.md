# BloxPluginInterface

## Description

Implement this interface to provide additional functionality in determining how to parse / handle a given value of a view before passing it to the component as a prop.

:::tip
Register plugins globally via the registerBlox(...) call.
:::

## Functions

```ts
run(
	key: string,
	value: any,
	variables: any,
	setProp: (key: string, value: any) => void,
	setSlot: (slotName: string, views: any[]) => void
): void
```

- **key:** ```string```

The key of the field in the view being computed.

- **value:** ```string```

The value of the field in the view being computed.

- **variables:** ```string```

Any variables provided with the view. If variables are reactive, you can modify them from here.

- **setProp(key, value):** ```string```

A function to invoke from your plugin in order to set a prop's value on the view. Passing undefined will delete the prop from the list of props passed to the view.

- **setSlot(slotName, views):** ```string```

A function to invoke from your plugin in order to set a slot on the view. Specify "default" as the slotName to provide views for an un-named slot. Views should be an array of objects with "type" fields that will be passed to a nested BloxComponent.