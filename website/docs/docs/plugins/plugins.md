# Plugins

Vue Blox is extendable through plugins. In fact, Vue Blox uses it's plugin system internally for handling slots and bindings.

Plugins are evaluated any time one of the views or variables being rendered within a BloxComponent changes. For this reason, plugins should exit early if they find they are not needed for the given key/value pair, and should be kept relatively light-weight.

Plugins are stackable, meaning each plugin registered (either globally via registerBlox(...) or explicitly via a BloxComponent's plugins prop) will be evaluated for each key/value of the view being rendered, in the order the plugins have been registered. This also means you can have multiple plugins work at once for a given entry in your view. For example, you could use the Mustache and Expression plugins to evaluate a view that combines them both:

```ts
const variables = {
	"score": 0
}

const view = {
	"type": "label",
	"compute:text": "score < 10 ? 'Your score of {{ score }} is low!' : 'Great score!'"
}
```

Plugins have the ability to set props (via the setProp(...) function they are given) or set slots (via the setSlot(...) function they are given). If a prop is set to undefined, it will be deleted.

## Example: Emoji Plugin

For this example, we will create an Emoji plugin that automatically replaces certain strings with emoji characters. To create a plugin, start by creating a class that implements the BloxPluginInterface:

```ts
import { BloxPluginInterface } from 'vue-blox'

class BloxPluginEmoji implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): { key: string, value: any } {
		// Plugin logic goes here
	}

}

export {
	BloxPluginEmoji
}

```

We want our plugin to replace certain strings with emojis. For our purposes, we will replace the following:
- [smile] => 😊
- [frown] => 🙁
- [angry] => 🤬
- [heart] => 😍

We can use the setProp(...) function provided to our plugin's run function in order to set the incoming prop's new value. We'll use this to set whatever prop our plugin is currently processing to the same value with these strings swapped out for emojis (if the value itself is a string, that is):

```ts
import { BloxPluginInterface } from 'vue-blox'

class BloxPluginEmoji implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): { key: string, value: any } {

		if (typeof value !== 'string') {
			return
		}

		const updatedValue = (value as string)
			.replace(/\[smile\]/g, '😊')
			.replace(/\[frown\]/g, '🙁')
			.replace(/\[angry\]/g, '🤬')
			.replace(/\[heart\]/g, '😍')

		setProp(key, updatedValue)

		// Return our updated value in place of the input value, to be passed to the next plugin (if any)

		return {
			key,
			value: updatedValue
		}

	}

}

// Export a convenience function for obtaining the plugin
function getPluginEmoji(): BloxPluginEmoji {
	return new BloxPluginEmoji()
}

export {
	BloxPluginEmoji,
	getPluginEmoji
}

```

Now, we can provide our plugin to Vue Blox:

```ts{2,13}
import { registerBlox } from 'vue-blox'
import { getPluginEmoji } from 'BloxPluginEmoji'

// ...

const app = createApp(App)

const blox = registerBlox({
	catalog: {
		...
	},
	plugins: [
		getPluginEmoji()
	]
})

app.use(blox)

app.mount('#app')
```

And we're ready to provide views to Vue Blox with the new Emoji plugin working:

```ts
// Construct a view to render. We set the text property of our label to be a string containing our emoji tokens, which will automatically be converted to emoji symbols by our plugin.
// Will render: "Emojis are cool 😊. Plugins are powerful 😍!"

const view = {
	type: 'label',
	text: 'Emojis are cool [smile]. Plugins are powerful [heart]!'
}
```