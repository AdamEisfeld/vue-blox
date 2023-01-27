import type { BloxContext } from '../classes/BloxContext'

/*
 * Implement this interface to provide additional functionality in determining how to parse / handle a given key/value of a view
 */
export interface BloxPluginInterface {

	run({
		context,
		key,
		value,
		variables,
		buildContext
	}: {
		context: BloxContext,
		key: string,
		value: any,
		variables: any,
		buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined
	}): void
	
}
