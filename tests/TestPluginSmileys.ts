import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A value plugin for unit tests, that replaces all [smiley] entries in string values with smiley emojis 😊
 */
export class TestPluginSmileys implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): void {

		if (typeof value !== 'string') {
			return undefined
		}
		setProp(key, (value as string).replace(/\[smiley\]/g, '😊'))

	}

}
