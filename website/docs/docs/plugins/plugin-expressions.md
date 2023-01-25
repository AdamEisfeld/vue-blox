# Plugin: Expressions

[View on Github](https://github.com/AdamEisfeld/vue-blox-expressions)

Depends on: 
- [expr-eval](https://github.com/silentmatt/expr-eval)

## Overview 

Vue Blox Expressions is powered by the popular expr-eval npm module. The plugin exposes the "compute:" and "on:" specifiers allowing you to create computed props on your components and trigger function calls in response to emitted events from your components.

Install the Vue Blox Expressions npm package to enable expression evaluations in Vue Blox.

```bash
npm install vue-blox-expressions
```

You will also need to install expr-eval:

```bash
npm install expr-eval
```

Finally, pass the expressions plugin globally via [registerBlox(...)](/docs/api/composables/register-blox):

```ts{2,3,9,16,17}
import { registerBlox } from 'vue-blox'
import { getPluginCompute, getPluginEvent } from 'vue-blox-expressions'
import { Parser } from 'expr-eval'

// ...

const app = createApp(App)

const parser = new Parser()

const blox = registerBlox({
	catalog: {
		...
	},
	plugins: [
		getPluginCompute(parser), // Add support for the compute: specifier
		getPluginEvent(parser), // Add support for the event specifier
	]
})

app.use(blox)

app.mount('#app')

```

::: tip
You can instead pass the compute / emit plugins directly to your [BloxComponent](/docs/api/components/blox-component) via the plugins array prop, if you don't want to register the plugins globally.
:::

## Compute

### Basics

The compute plugin allows you to evaluate string expressions at runtime. Everything supported out-of-the-box by expr-eval is supported in these evaluations. For example, you can create locally scoped variables within your expression, and evaluate mathematical calculations on them:

```ts
const view = {
	"type": "label",
	"compute:text": "x = 1; y = 2; x * y;" // Sets text to "2"
}
```

### Variable References

All of the variables you provide to your BloxComponent are automatically provided to your compute expressions. This means you can use your component variables in your calculations:

```ts
const variables = {
	"age" : 32,
}

const view = {
	"type": "label",
	"compute:text": "age * 2;" // Sets text to "64". Whenever "age" is modified, text is recalculated.
}
```

### Conditions

Create conditional logic within your computed values easily:

```ts
const variables = {
	"age" : 32,
}

const view = {
	"type": "label",
	"compute:text": "age = 30; age < 50 ? \"You are not old enough for a seniors discount\" : \"Discount applied!\";"
}
```

You can even return values from your variables:

```ts
const variables = {
	"age" : 32,
	"msgSuccess": "You are not old enough for a seniors discount",
	"msgFailure": "Discount applied!"
}

const view = {
	"type": "label",
	"compute:text": "age = 30; age < 50 ? msgSuccess : msgFailure;"
}
```

Arrays are supported as well:

```ts
const variables = {
	"age" : 32,
	"messages": [
		"You are not old enough for a seniors discount",
		"Discount applied!"
	]
}

const view = {
	"type": "label",
	"compute:text": "age = 30; age < 50 ? messages[0] : messages[1];"
}
```


### Functions

Invoke functions from your computed values. All of the default mathematical functions expr-eval supports are supported out-of-the-box. For example, we can calculate Pythagorean's theorem:


```ts
const variables = {
	"a" : 1,
	"b": 2
}

const view = {
	"type": "label",
	"compute:text": "sqrt(a * a + b * b)"
}
```

You can add additional support for your own custom functions by registering them on the Parser object you pass to the compute plugin:

```ts{10-12}
import { registerBlox } from 'vue-blox'
import { getPluginCompute, getPluginEvent } from 'vue-blox-expressions'
import { Parser } from 'expr-eval'

// ...

const app = createApp(App)

const parser = new Parser()
parser.functions.pythagorean = (x: number, y: number) => {
	return Math.sqrt(x * x + y * y)
}

const blox = registerBlox({
	catalog: {
		...
	},
	plugins: [
		getPluginCompute(parser), // Add support for the compute: specifier
		getPluginEvent(parser), // Add support for the event specifier
	]
})

app.use(blox)

app.mount('#app')

```

And invoke them:

```ts
const variables = {
	"a" : 1,
	"b": 2
}

const view = {
	"type": "label",
	"compute:text": "pythagorean(a, b)"
}
```

## Events

The event plugin allows you to register a string of text to be evaluated by expr-eval when the component emits the specified event.

For example, you can update one of your variables in response to a component emitting the "buttonClicked" event by invoking the setVariable(key, value) function automatically added to every Parser:

```ts
const variables = {
	"didClick" : false,
}

const view = {
	"type": "label",
	"event:buttonClicked": "setVariable('didClick', true)"
}
```

Multiple functions can be called in sequence. For example, you could register a logging function on your Parser:


```ts{10-12}
import { registerBlox } from 'vue-blox'
import { getPluginCompute, getPluginEvent } from 'vue-blox-expressions'
import { Parser } from 'expr-eval'

// ...

const app = createApp(App)

const parser = new Parser()
parser.functions.console = (message: any) => {
	console.log(message)
}

const blox = registerBlox({
	catalog: {
		...
	},
	plugins: [
		getPluginCompute(parser), // Add support for the compute: specifier
		getPluginEvent(parser), // Add support for the event specifier
	]
})

app.use(blox)

app.mount('#app')

```

And invoke the console() function before setting your value:

```ts
const variables = {
	"didClick" : false,
}

const view = {
	"type": "label",
	"event:buttonClicked": "console('User clicked!'); setVariable('didClick', true)"
}
```