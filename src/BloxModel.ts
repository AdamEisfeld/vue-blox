import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * A BloxModel represents an input model and variables pair that has been processed by Blox, whereby the objects have been
 * traversed, reactive props have been extracted, and slots have been analyzed.
 */
export class BloxModel {

	view: any = undefined
	props: Record<string, any> = {}
	slots: Record<string, BloxModel[]> = {}

	static from(inputModel: Record<string, any> | undefined, inputVariables: Record<string, any> | undefined = undefined, existingVariables: Record<string, Ref<any>> | undefined = undefined): { processedView: any, model: BloxModel, variables: Record<string, Ref<any>> } {
		
		const processedVariables: Record<string, Ref<any>> = existingVariables ?? {}

		const model = new BloxModel()
		const processed = this.process(inputModel, inputVariables, processedVariables)

		model.props = processed.processedProps
		model.slots = processed.processedSlots
		model.view = processed.processedView

		return {
			processedView: processed.processedView,
			model: model,
			variables: processedVariables,
		}
	}

	private static process(inputModel: Record<string, any> | undefined, inputVariables: Record<string, any> | undefined, processedVariables: Record<string, Ref<any>>): { processedView: any, processedVariables: Record<string, Ref<any>>, processedProps: Record<string, any>, processedSlots: Record<string, any[]> } {

		const useModel = inputModel ?? {}
		const processedView: any = {}
		Object.assign(processedView, useModel)

		const useVariables = inputVariables ?? {}
		const processedProps: Record<string, any> = {}
		const processedSlots: Record<string, any[]> = {}

		const keys = Object.keys(useModel)

		for (let k = 0; k < keys.length; k += 1) {

			const key = keys[k]
			const value: any = useModel[key]

			if (key.startsWith('slot:')) {

				// This is a child slot

				// 1. Get the slot name
				const slotName = key.substring('slot:'.length, key.length)
				if (slotName.length === 0) {
					continue
				}

				// 2. The value for the key is the view or views we want to put into the slot
				
				let inputSlots: any[] | undefined = undefined
				if (Array.isArray(value)) {
					inputSlots = value
				} else if (typeof value === 'object') {
					inputSlots = [value]
				}
				if (!inputSlots || inputSlots.length === 0) {
					continue
				}

				const slots: BloxModel[] = []
				const processedViews: any[] = []
				for (let i = 0; i < inputSlots.length; i += 1) {
					const inputSlot = inputSlots[i]
					const slot = new BloxModel()
					const processed = this.process(inputSlot, inputVariables, processedVariables)
					slot.props = processed.processedProps
					slot.view = processed.processedView
					slot.slots = processed.processedSlots
					processedViews.push(processed.processedView)
					slots.push(slot)
				}

				// 3. Add views entry
				processedSlots[slotName] = slots

				// 4. Update mutable view to remove the slot key and just have the static value provided
				delete processedView[key]
				processedView[slotName] = processedViews

			} else if (key.startsWith('bind:')) {

				// This is a bound prop. 

				// 1. Get the prop name
				const propName = key.substring('bind:'.length, key.length)
				if (propName.length === 0) {
					continue
				}

				// 2. The value for the key is the name of a variable we want to bind to
				const variableName = value
				if (typeof variableName !== 'string') {
					continue
				}

				// 3. Check if we have a provided value in variables
				const boundValue = useVariables[variableName]

				if (!processedVariables[variableName]) {

					// 4. Add processed variables entry if we dont have one yet
					const reactiveValue = ref(boundValue)
					processedVariables[variableName] = reactiveValue

				}
			
				// 5. Construct getter / setter props for v-bind
				processedProps[propName] = processedVariables[variableName]
				processedProps[`onUpdate:${propName}`] = (newValue: any) => {
					const currentBoundValue = processedVariables[variableName]
					currentBoundValue.value = newValue
				}

				// 6. Update mutable view to remove the bound key and just have the static value provided
				delete processedView[key]
				processedView[propName] = boundValue
					
			} else {

				// This is a basic primitive prop

				const propName = key
				processedProps[propName] = ref(value)

			}

		}

		return {
			processedView: processedView,
			processedVariables: processedVariables,
			processedProps: processedProps,
			processedSlots: processedSlots
		}

	}

}
