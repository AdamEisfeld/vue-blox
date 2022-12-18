import type { Ref } from 'vue'

/**
 * Bindings hold a map of key/value pairs, where the keys are the keys provided from some input object representing variables
 * to bind to, and the values are reactive references to the values provided in the original object.
 */
export class BloxBindings {
	entries: Record<string, Ref<any>> = {}
}
