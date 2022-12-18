import { ref } from 'vue'
import { BloxBindings } from '../classes/BloxBindings'

/**
 * Converts the plain inputVariables JS object into a reactive BloxBindings instance for use in a BloxComponent.
 * You can use Vue's watch() functionality on the result's entries dictionary values to determine when changes to
 * variables have been made.
 * 
 * @param inputBindings An optional object who's keys represent variable names, and values represent initial values for those variables.
 * @returns A BloxBindings instance, who's entries object contains the same keys as the provided inputBindings object,
 * but who's values are wrapped in reactive refs.
 */
export function getBloxBindings(inputBindings: any): BloxBindings {
	const result = new BloxBindings()
	const useBindings = inputBindings ?? {}
	const keys = Object.keys(useBindings)
	for (let v = 0; v < keys.length; v += 1) {
		const key = keys[v]
		const value = useBindings[key]
		result.entries[key] = ref(value)
	}
	return result
}
