import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A plugin for unit tests, that replaces all [smiley] entries in string values with smiley emojis 😊
 */
export class TestPluginSmileys implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): { key: string, value: any } {

		if (typeof value !== 'string') {
			return { key, value }
		}
		const result = (value as string).replace(/\[smiley\]/g, '😊')
		setProp(key, (value as string).replace(/\[smiley\]/g, '😊'))
		return { key, value: result }
	}

}
