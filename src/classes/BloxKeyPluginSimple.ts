import type { BloxKeyPluginInterface } from '../interfaces/BloxKeyPluginInterface'
import type { BloxBindings } from './BloxBindings'
import type { BloxView } from './BloxView'
import { ref } from 'vue'

/**
 * A key plugin that simply maps the value in the input object to a reactive value in the output props.
 */
export class BloxKeyPluginSimple implements BloxKeyPluginInterface {

	handleKey(key: string, value: any, bindings: BloxBindings, getNestedBloxView: (inputView: any) => BloxView ): { props: Record<string, any> | undefined, slots: Record<string, BloxView[]> | undefined } | undefined {
		
		const props: Record<string, any> = {}
		props[key] = ref(value)

		return {
			props: props,
			slots: undefined,
		}
		
	}

}
