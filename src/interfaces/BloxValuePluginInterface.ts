/**
 * Implement this interface to provide additional functionality in determining how to parse / handle a given value of a view
 * before passing it to the component as a prop.
 */
export interface BloxValuePluginInterface {

	handleValue(value: any, variables: Record<string, any>): any

}
