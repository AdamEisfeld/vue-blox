import type { ComponentPublicInstance } from 'vue'

/**
 * Catalogs map type names (strings) to Vue components, and facilitate obtaining components from their internal map given a type name.
 */
export class BloxCatalog {

	static shared = new BloxCatalog()

	private componentMap: Record<string, ComponentPublicInstance<any>> = {}

	public register({ type, component}: { type: string, component: ComponentPublicInstance<any> }) {
		this.componentMap[type] = component
	}

	public registerAll(map: Record<string, ComponentPublicInstance<any>>) {
		Object.assign(this.componentMap, map)
	}

	public getComponentForType(type: string): ComponentPublicInstance<any> | undefined {
		return this.componentMap[type]
	}

}
