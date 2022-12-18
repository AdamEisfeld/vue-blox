import type { App, ComponentPublicInstance, Plugin } from 'vue';
import { BloxGlobal } from '../classes/BloxGlobal';
import BloxComponent from '../components/BloxComponent.vue';
import type { BloxKeyPluginInterface } from '../interfaces/BloxKeyPluginInterface';
import type { BloxValuePluginInterface } from '../interfaces/BloxValuePluginInterface';

/**
 * A Vue plugin that registers various Vue Blox settings app-wide.
 * 
 * @param options Initialization options to use when setting up Vue Blox. Specify a global catalog and array of plugins to use throoughout the application. 
 * @returns 
 */
export function registerBlox(options: { catalog: Record<string, ComponentPublicInstance<any>>, keyPlugins?: BloxKeyPluginInterface[], valuePlugins?: BloxValuePluginInterface[] }): Plugin {

	const blox: Plugin = {
		install: (app: App, inner: Record<string, ComponentPublicInstance<any>>) => {
			BloxGlobal.shared.catalog.register(options.catalog)
			BloxGlobal.shared.keyPlugins = options.keyPlugins ?? []
			BloxGlobal.shared.valuePlugins = options.valuePlugins ?? []
			app.component('BloxComponent', BloxComponent)
		}
	}

	return blox

}
