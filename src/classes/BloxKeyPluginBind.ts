
import type { BloxKeyPluginInterface } from '../interfaces/BloxKeyPluginInterface'
import type { BloxBindings } from './BloxBindings'
import type { BloxView } from './BloxView'
import { BloxError } from './BloxError'
import type { BloxConfig } from './BloxConfig'

/**
 * A key plugin that searches for keys that start with 'bind:' and prepares the resulting prop to be 2-way bound to the matching
 * variable entry in the provided variables.
 */
export class BloxKeyPluginBind implements BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView, config?: BloxConfig ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined {
		
		const bindSpecifier = config?.bindSpecifier ?? 'bind:'
		if (!key.startsWith(bindSpecifier)) {
			return undefined
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
		const props: Record<string, any> = {}
		props[propName] = bindings.entries[variableName]
		props[`onUpdate:${propName}`] = (newValue: any) => {
			const currentBoundValue = bindings.entries[variableName]
			currentBoundValue.value = newValue
		}

		return {
			props: props,
			slots: undefined,
		}
		
	}

}
