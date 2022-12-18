import type { BloxBindings } from '../src/classes/BloxBindings'
import type { BloxView } from '../src/classes/BloxView'
import type { BloxKeyPluginInterface } from '../src/interfaces/BloxKeyPluginInterface'

/**
 * A key plugin for unit tests, that checks for keys with the toUpper: prefix, and if found converts the values (if strings) to upper case.
 */
export class TestKeyPlugin implements BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined {
		
		if (!key.startsWith('toUpper:')) {
			return undefined
		}

		// 1. Get the prop name
		const propName = key.substring('toUpper:'.length, key.length)
		const updatedValue = typeof value === 'string' ? value.toUpperCase() : value

		const props: Record<string, any> = {}
		props[propName] = updatedValue

		return {
			props: props,
			slots: undefined,
		}
		
	}

}
