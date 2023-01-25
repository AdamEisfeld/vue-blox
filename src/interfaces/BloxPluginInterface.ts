/**
 * Implement this interface to provide additional functionality in determining how to parse / handle a given key/value of a view
 */
export interface BloxPluginInterface {

	run(key: string, value: any, variables: any, setProp: (key: string, value: any) => void, setSlot: (slotName: string, views: any[]) => void ): { key: string, value: any }

}
