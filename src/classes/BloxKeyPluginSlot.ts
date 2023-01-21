import type { BloxKeyPluginInterface } from '../interfaces/BloxKeyPluginInterface'
import type { BloxBindings } from './BloxBindings'
import type { BloxView } from './BloxView'
import type { BloxConfig } from './BloxConfig'

/**
 * A key plugin that searches for keys that start with 'slot:' and recursively creates additional BloxViews to be injected into
 * the Vue component's slots.
 * 
 * The text after 'slot:' refers to the name of the slot in the Vue component you wish to insert the child components into.
 * The value can either be a single object representing another view mapped to Vue Blox, or an array of multiple objects.
 */
export class BloxKeyPluginSlot implements BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView, config?: BloxConfig ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined {
		
		const slotSpecifier = config?.bindSpecifier ?? 'slot:'
		if (!key.startsWith(slotSpecifier)) {
			return undefined
		}

		// This is a child slot

		// 1. Get the slot name
		let slotName = key.substring(slotSpecifier.length, key.length)
		if (slotName.length === 0) {
			slotName = 'default'
		}

		// 2. The value for the key is the view or views we want to put into the slot
		
		let inputSlotViews: any[] | undefined = undefined
		if (Array.isArray(value)) {
			inputSlotViews = value
		} else if (typeof value === 'object') {
			inputSlotViews = [value]
		}
		if (!inputSlotViews || inputSlotViews.length === 0) {
			return undefined
		}

		// 3. Construct nested views

		const slotChildren: BloxView[] = []
		for (let i = 0; i < inputSlotViews.length; i += 1) {
			const inputSlotView = inputSlotViews[i]
			const BloxView = getNestedBloxView(inputSlotView)
			slotChildren.push(BloxView)
		}

		const slots: Record<string, BloxView[]> = {}
		slots[slotName] = slotChildren

		return {
			props: undefined,
			slots: slots,
		}
		
	}

}
