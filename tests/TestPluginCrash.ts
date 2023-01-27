import type { BloxContext } from '../src/classes/BloxContext'
import type { ComponentPublicInstance } from 'vue'
import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A plugin for unit tests, that throws an error on run
 */
export class TestPluginCrash implements BloxPluginInterface {

	failingKey: string | undefined

	constructor(failingKey: string | undefined) {
		this.failingKey = failingKey
	}

	run({ context, key, value, variables, buildContext }: { context: BloxContext, key: string, value: any, variables: any, buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined }): void {
		
		if (this.failingKey && key !== this.failingKey) {
			return
		}

		throw new Error('Failed')
	}

}
