import type { BloxKeyPluginInterface } from "../interfaces/BloxKeyPluginInterface"
import type { BloxValuePluginInterface } from "../interfaces/BloxValuePluginInterface"
import { BloxCatalog } from "./BloxCatalog"

/**
 * This class stores any globals used when installing Vue Blox app-wide
 */
export class BloxGlobal {

	static shared = new BloxGlobal()

	catalog: BloxCatalog = new BloxCatalog()
	keyPlugins: BloxKeyPluginInterface[] = []
	valuePlugins: BloxValuePluginInterface[] = []

}
