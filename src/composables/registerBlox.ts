import type { App, ComponentPublicInstance, Plugin } from 'vue';
import { BloxGlobal } from '../classes/BloxGlobal';
import BloxComponent from '../components/BloxComponent.vue';
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'

/**
 * Returns a Vue plugin that registers various Vue Blox settings app-wide.
 * 
 * @param options Initialization options to use when setting up Vue Blox. Specify a global catalog and array of plugins to use throoughout the application. 
 * @returns 
 */
export function registerBlox(options?: { catalog?: Record<string, ComponentPublicInstance<any>>, plugins?: BloxPluginInterface[] }): Plugin {

	const blox: Plugin = {
		install: (app: App, inner: Record<string, ComponentPublicInstance<any>>) => {
			BloxGlobal.shared.catalog = options?.catalog ?? {}
			BloxGlobal.shared.plugins = options?.plugins ?? []
			app.component('BloxComponent', BloxComponent)
		}
	}

	return blox

}
