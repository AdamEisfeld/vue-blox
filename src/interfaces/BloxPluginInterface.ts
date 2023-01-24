/**
 * Implement this interface to provide additional functionality in determining how to parse / handle a given key of a view when
 * preparing a BloxView instance.
 */
export interface BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): void

}
