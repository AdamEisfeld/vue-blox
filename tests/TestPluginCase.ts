import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A key plugin for unit tests, that checks for keys with the toUpper: prefix, and if found converts the values (if strings) to upper case.
 */
export class TestPluginCase implements BloxPluginInterface {

	run(key: string, value: any, variables: any ): { props: Record<string, any> | undefined, slots: Record<string, any[]> | undefined } | undefined {
		
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
