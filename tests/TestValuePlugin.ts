import type { BloxValuePluginInterface } from '../src/interfaces/BloxValuePluginInterface'

/**
 * A value plugin for unit tests, that replaces all [smiley] entries in string values with smiley emojis 😊
 */
export class TestValuePlugin implements BloxValuePluginInterface {

	handleValue(value: any, variables: Record<string, any>): any {

		if (typeof value !== 'string') {
			return value
		}

		return (value as string).replace(/\[smiley\]/g, '😊')

	}

}
