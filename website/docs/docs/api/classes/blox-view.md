# BloxView

A view, behaving as a view-model, representing the props / slots to be passed to a BloxComponent. The BloxComponent will inspect the view's type along with the catalog it has been provided to determine which Vue component to render.

```ts
import { BloxView } from 'vue-blox'
```


## Properties

- **type:** ```string```

The original type value provided in the plain JS object used to construct this view.

- **props:** ```Record<string, any> = {}```

The props that will be passed to the component for this view when rendered. Includes event listeners constructed for [BloxBindings](/docs/api/classes/blox-bindings).

- **slots:** ```Record<string, BloxView[]>```

A map of nested BloxViews that will be inserted into the slots of this view's component. The keys represent the names of the slots that will be used, and the values represent the views that will be inserted into those slots.
