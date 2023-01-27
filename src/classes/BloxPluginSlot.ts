import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'
import type { BloxContext } from './BloxContext'

/**
 * A key plugin that searches for keys that start with 'slot:' and recursively creates additional BloxViews to be injected into
 * the Vue component's slots.
 * 
 * The text after 'slot:' refers to the name of the slot in the Vue component you wish to insert the child components into.
 * The value can either be a single object representing another view mapped to Vue Blox, or an array of multiple objects.
 */
export class BloxPluginSlot implements BloxPluginInterface {

	run({ context, key, value, variables, buildContext }: { context: BloxContext, key: string, value: any, variables: any, buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined }) {	

		const slotSpecifier = 'slot:'
		if (!key.startsWith(slotSpecifier)) {
			return
		}

		// This is a child slot

		// 1. Get the slot name
		let slotName = key.substring(slotSpecifier.length, key.length)
		
		if (slotName.length === 0) {
			slotName = 'default'
		}

		// 2. The value for the key is the view or views we want to put into the slot
		
		if (typeof value === 'object' && Array.isArray(value) && value.filter(v => v.type && typeof v.type === 'string').length === value.length) {

			// This is a nested array of views
			
			const nestedContexts: BloxContext[] = []

			for (let v = 0; v < value.length; v += 1) {
				const nestedView = value[v]
				const nestedContext = buildContext({
					view: nestedView,
					variables: variables,
				})
				if (nestedContext) {
					nestedContexts.push(nestedContext)
				}
			}

			if (nestedContexts.length === 0) {
				return
			}
			
			context.setProp({
				propName: key,
				value: undefined
			})

			context.setSlot({
				slotName: slotName,
				children: nestedContexts
			})

		} else if (typeof value === 'object' && value.type && typeof value.type === 'string') {

			// This is a nested view

			const nestedView = value
			const nestedContext = buildContext({
				view: nestedView,
				variables: variables,
			})

			if (!nestedContext) {
				throw new Error(`Unable to obtain nested view for slot "${slotName}".`)
			}
			
			context.setProp({
				propName: key,
				value: undefined
			})

			context.setSlot({
				slotName: slotName,
				children: [nestedContext]
			})

		}

	}

}
