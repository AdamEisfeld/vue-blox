import type { BloxPluginInterface } from "../interfaces/BloxPluginInterface"
import type { ComponentPublicInstance } from 'vue'

/**
 * This class stores any globals used when installing Vue Blox app-wide
 */
export class BloxGlobal {

	static shared = new BloxGlobal()

	catalog: Record<string, ComponentPublicInstance<any>> = {}
	plugins: BloxPluginInterface[] = []

}
