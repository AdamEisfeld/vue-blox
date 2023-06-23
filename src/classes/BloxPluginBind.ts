
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'
import type { BloxContext } from './BloxContext'

/**
 * A key plugin that searches for keys that start with 'bind:' and prepares the resulting prop to be 2-way bound to the matching
 * variable entry in the provided variables.
 */
export class BloxPluginBind implements BloxPluginInterface {

	run({ context, key, value, variables, buildContext }: { context: BloxContext, key: string, value: any, variables: any, buildContext: ({ view, variables }: { view: any, variables: any }) => BloxContext | undefined }) {	
		
		const bindSpecifier = 'bind:'
		if (!key.startsWith(bindSpecifier)) {
			return
		}

		// This is a bound prop. 

		// 1. Get the prop name
		const propName = key.substring(bindSpecifier.length, key.length)
		if (propName.length === 0) {
			throw new Error(`The value for the prop name for bound variable key/value pairs must be a string with length > 0.`)
		}

		// 2. The value for the key is the name of a variable we want to bind to
		const variableName = value
		if (typeof variableName !== 'string') {
			throw new Error(`The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof variableName} for bound value ${key}.`)
		}
	
		// 3. Construct getter / setter props for v-bind

		context.setProp({
			propName: key,
			value: undefined
		})

		const get_value = () => {
			const paths = variableName.split('.')
			let value = variables
			for (const path of paths) {
				value = value[path]
			}
			return value
		}

		const set_value = (newValue: any) => {
			const paths = variableName.split('.')
			let value = variables
			for (let i = 0; i < paths.length - 1; i++) {
				value = value[paths[i]]
			}
			value[paths[paths.length - 1]] = newValue
		}



		context.setProp({
			propName: propName,
			value: get_value()
		})

		context.setProp({
			propName: `onUpdate:${propName}`,
			value: (newValue: any) => {
				set_value(newValue)
			}
		})

	}

}
