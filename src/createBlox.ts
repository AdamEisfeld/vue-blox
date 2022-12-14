import type { App, ComponentPublicInstance, Plugin } from 'vue';
import { BloxCatalog } from './BloxCatalog';
import { BloxView } from './';

/**
 * A convenience function for setting up VueBlox app-wide as a plugin.
 * @param catalog A map of type names to Vue components you wish to support globally in your Vue application.
 */
export function createBlox(catalog: Record<string, ComponentPublicInstance<any>>): Plugin {

	const blox: Plugin = {
		install: (app: App, options: Record<string, ComponentPublicInstance<any>>) => {
			BloxCatalog.shared.registerAll(catalog)
			app.component('BloxView', BloxView)
		}
	}

	return blox

}
