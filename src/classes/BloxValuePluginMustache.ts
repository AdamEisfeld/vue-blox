import type { BloxValuePluginInterface } from '../interfaces/BloxValuePluginInterface'
import { BloxError } from '../classes/BloxError'
import * as mustache from 'mustache'

/**
 * A value plugin for rendering mustache templates.
 */
export class BloxValuePluginMustache implements BloxValuePluginInterface {

	handleValue(value: any, variables: Record<string, any>): any {
		return this.runMustache(value, variables, 0, 10)
	}

	runMustache(value: any, variables: Record<string, any>, steps: number = 0, maxSteps: number = 10) {

		if (typeof value !== 'string' || !value.includes('{{')) {
			// This definitely isn't a mustache entry, exit early
			return value
		}

		try {
			let unwrapped = mustache.render(value, variables)
			if (unwrapped.includes('{{') && steps < 10) {
				unwrapped = this.runMustache(unwrapped, variables, steps + 1)
			}
			return unwrapped
		} catch(error) {
			throw new BloxError(
				'Mustache parsing failed.',
				`The call to runMustache() for value ${value} threw the error: ${error}`,
				undefined
			)
		}

	}

}
