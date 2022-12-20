# BloxBindings

Bindings hold a map of key/value pairs, where the keys are the keys provided from some input object representing variables to bind to, and the values are reactive references to the values provided in the original object.

```ts
import { BloxBindings } from 'vue-blox'
```

## Properties

- **entries:** ```Record<string, Ref<any>>```

A map of key/value pairs, where the keys represent identifiers of the bound value, and the values represent reactive values provided as the props to components injected via [BloxComponents](/docs/api/components/blox-component).
