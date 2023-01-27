import type { BloxContext } from '../src/classes/BloxContext'
import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A plugin for unit tests, that replaces all [smiley] entries in string values with smiley emojis 😊
 */
export class TestPluginSmileys implements BloxPluginInterface {

	run({ context, key, value, variables, buildContext }: { context: BloxContext, key: string, value: any, variables: any, buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined }): void {	
	
		if (typeof value !== 'string') {
			return
		}
		const result = (value as string).replace(/\[smiley\]/g, '😊')
		context.setProp({
			propName: key,
			value: result
		})

	}

}
