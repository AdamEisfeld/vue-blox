import type { ComponentPublicInstance } from 'vue'
import { BloxCatalog } from '../classes/BloxCatalog'

/**
 * Catalogs are used by Vue Blox to determine which Vue component to render based on the 'type' key/value pair found
 * in the object you're trying to render.
 * 
 * @param components A map of Vue components to type names to use when determining which component to render in a BloxComponent.
 * @returns A new BloxCatalog instance with the provided components mapped.
 */
export function getBloxCatalog(components: Record<string, ComponentPublicInstance<any>>): BloxCatalog {
	const catalog = new BloxCatalog()
	catalog.register(components)
	return catalog
}
