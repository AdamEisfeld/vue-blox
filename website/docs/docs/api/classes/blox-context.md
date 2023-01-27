# BloxContext

Contexts represent all of the computed information Vue Blox builds to represent a given view you provide to a BloxComponent. This includes the computed props and slots, the component to use when rendering the view, an the view used to construct the context.

Contexts include functions for updating their props / slots, designed to be used by plugins extending Vue Blox.

## Properties

- **component:** ```ComponentPublicInstance<any>```

The Vue component that will be inserted into the BloxComponent when rendering this context.

- **view:** ```any```

The view used to construct this context.

- **props:** ```Record<string, any>```

A record of all of the props that will be provided to the inserted component for this context.

- **slots:** ```Record<string, BloxContext[]>```

A record of all of the slots that will be defined in the inserted component for this context, where each slot contains an array of contexts.

## Functions

### setProp(```{ propName, value }```)

- **propName:** ```string```

The name of the prop to set.

- **value:** ```any```

The value to set for the prop. If undefined, the prop will be deleted from the context.


### setSlot(```{ slotName, children }```)

- **slotName:** ```string```

The name of the slot to set.

- **children:** ```BloxContext[]```

The child contexts to set for the slot. If undefined, the slot will be deleted from the context.