import type { ComponentPublicInstance } from 'vue'
import { BloxContext } from '../classes/BloxContext'
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'
import { deepCopy } from './deepCopy'

export function buildRootContext({ view, variables, catalog, plugins }: { view: any, variables: any, catalog: Record<string, ComponentPublicInstance>, plugins: BloxPluginInterface[] }): { context: BloxContext | undefined, errors: { view: any, error: any }[] | undefined } {

	if (!view) {
		// No view specified, return empty
		return {
			context: undefined,
			errors: undefined
		}
	}

	if (!view.type) {
		// No view type specified, return empty
		return {
			context: undefined,
			errors: [{
				view: view,
				error: new Error('No view type specified.')
			}]
		}
	}

	const errors: { view: any, error: any }[] = []

	const result = new BloxContext()
	result.component = catalog[view.type]
	result.props = deepCopy(view)

	const viewKeys = Object.keys(result.props)

	const buildContext = ({ view, variables }: { view: any, variables: any }): BloxContext | undefined => {
		
		const result = buildRootContext({
			view: view,
			variables: variables,
			catalog: catalog,
			plugins: plugins
		})

		if (result && result.errors && result.errors.length > 0) {
			errors.push(...result.errors)
		}

		return result?.context
	}

	for (let k = 0; k < viewKeys.length; k += 1) {

		const key = viewKeys[k]

		// Iterate over plugins, running them on each key/value pair of our view to build our
		// final props / slots to provide to the embedded component

		for (let p = 0; p < plugins.length; p += 1) {

			const value = result.props[key]
			const plugin = plugins[p]
			try {
				plugin.run({
					context: result,
					key: key,
					value: value,
					variables: variables,
					buildContext: buildContext
				})
			} catch(error) {
				errors.push({
					view: view,
					error: error
				})
			}

		}

	}

	// Remove the type specifier
	result.setProp({
		propName: 'type',
		value: undefined,
	})

	return {
		context: result,
		errors: errors
	}

}