import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'

/**
 * A key plugin that searches for keys that start with 'slot:' and recursively creates additional BloxViews to be injected into
 * the Vue component's slots.
 * 
 * The text after 'slot:' refers to the name of the slot in the Vue component you wish to insert the child components into.
 * The value can either be a single object representing another view mapped to Vue Blox, or an array of multiple objects.
 */
export class BloxPluginSlot implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): void {
		
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
		
		let inputSlotViews: any[] | undefined = undefined
		if (Array.isArray(value)) {
			inputSlotViews = value
		} else if (typeof value === 'object') {
			inputSlotViews = [value]
		}
		if (!inputSlotViews || inputSlotViews.length === 0) {
			return
		}

		const slots: Record<string, any[]> = {}
		slots[slotName] = inputSlotViews
		
		setSlot(slotName, inputSlotViews)
		
	}

}
