import type { BloxPluginInterface } from '../src/interfaces/BloxPluginInterface'

/**
 * A plugin for unit tests, that throws an error on run
 */
export class TestPluginCrash implements BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): { key: string, value: any } {
		throw new Error('Failed')
	}

}
