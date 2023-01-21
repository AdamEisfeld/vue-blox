import type { BloxView } from '../classes/BloxView'
import type { BloxBindings } from '../classes/BloxBindings'
import type { BloxConfig } from '../classes/BloxConfig'

/**
 * Implement this interface to provide additional functionality in determining how to parse / handle a given key of a view when
 * preparing a BloxView instance.
 */
export interface BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView, config?: BloxConfig ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined

}
