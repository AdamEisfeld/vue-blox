import { BloxView } from '../classes/BloxView'
import { BloxBindings } from '../classes/BloxBindings'
import type { BloxKeyPluginInterface } from '../interfaces/BloxKeyPluginInterface'
import { BloxKeyPluginSimple } from '../classes/BloxKeyPluginSimple'
import { BloxKeyPluginBind } from '../classes/BloxKeyPluginBind'
import { BloxKeyPluginSlot } from '../classes/BloxKeyPluginSlot'
import { BloxError } from '../classes/BloxError'
import { BloxGlobal } from '../classes/BloxGlobal'

/**
 * Converts a regular JS object into a view model for a BloxComponent's view property.
 * 
 * @param inputView The object to convert to a Vue Blox view model ready to be passed to a BloxComponent.
 * @param bindings An optional BloxBindings instance of reactive variables to provide to the BloxComponent.
 * @param plugins An optional array of processing plugins to use before Vue Blox carries out it's processing.
 * Plugins allow you to add your own processing logic for new key types.
 * @returns A new BloxView instance ready to be passed to a BloxComponent.
 */
export function getBloxView(inputView: any, bindings?: BloxBindings, plugins?: BloxKeyPluginInterface[]): BloxView {

	const usePlugins: BloxKeyPluginInterface[] = plugins ?? []
	usePlugins.push(...[
		new BloxKeyPluginBind(),
		new BloxKeyPluginSlot(),
		new BloxKeyPluginSimple()
	])
	usePlugins.push(...BloxGlobal.shared.keyPlugins)

	const useBindings = bindings ?? new BloxBindings()

	const type = inputView['type']
	if (typeof type !== 'string') {
		throw new BloxError(
			'View parsing failed.',
			`The value for the "type" key on a view must be a string.`,
			{
				view: inputView,
			}
		)
	}

	const keys = Object.keys(inputView)

	const props: Record<string, any> = {}
	const slots: Record<string, BloxView[]> = {}

	for (let k = 0; k < keys.length; k += 1) {

		const key = keys[k]
		if (key === 'type') {
			// Skip the type key, it is reserved for Vue Blox parsing to determine the correct component to use
			continue
		}

		const value: any = inputView[key]

		for (let p = 0; p < usePlugins.length; p += 1) {
			const plugin = usePlugins[p]
			const evaluation = plugin.handleKey(key, value, useBindings, (nestedInputView: any) => {
				return getBloxView(nestedInputView, useBindings, plugins)
			})
			if (evaluation) {
				Object.assign(props, evaluation.props)
				Object.assign(slots, evaluation.slots)
				break
			}
		}

	}

	const result = new BloxView()
	result.type = type
	result.props = props
	result.slots = slots
	return result

}
