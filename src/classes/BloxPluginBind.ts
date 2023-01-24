
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'
import { BloxError } from './BloxError'

/**
 * A key plugin that searches for keys that start with 'bind:' and prepares the resulting prop to be 2-way bound to the matching
 * variable entry in the provided variables.
 */
export class BloxPluginBind implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): void {
		
		const bindSpecifier = 'bind:'
		if (!key.startsWith(bindSpecifier)) {
			return
		}

		// This is a bound prop. 

		// 1. Get the prop name
		const propName = key.substring(bindSpecifier.length, key.length)
		if (propName.length === 0) {
			throw new BloxError(
				'Bind parsing failed.',
				`The value for the prop name for bound variable key/value pairs must be a string with length > 0.`,
				{
					key, value
				}
			)
		}

		// 2. The value for the key is the name of a variable we want to bind to
		const variableName = value
		if (typeof variableName !== 'string') {
			throw new BloxError(
				'Bind parsing failed.',
				`The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof variableName} for bound value ${key}.`,
				{
					key, value
				}
			)
		}
	
		// 3. Construct getter / setter props for v-bind

		setProp(key, undefined)
		setProp(propName, variables[variableName])
		setProp(`onUpdate:${propName}`, (newValue: any) => {
			variables[variableName] = newValue
		})

		// const typeErased: any = bindings.entries
		// setProp(propName, typeErased.value ? typeErased.value[variableName] : typeErased[variableName])
		// setProp(`onUpdate:${propName}`, (newValue: any) => {
		// 	if (typeErased.value) {
		// 		typeErased.value[variableName] = newValue
		// 	} else {
		// 		typeErased[variableName] = newValue
		// 	}
		// })
		
	}

}
