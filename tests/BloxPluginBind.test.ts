import { BloxContext } from '../src/classes/BloxContext'
import { test, expect } from 'vitest'
import { BloxPluginBind } from '../src/classes/BloxPluginBind'

test('Bind plugin creates reactive bindings', async () => {

	// Given

	const plugin = new BloxPluginBind()
	
	const variables = {
		'name': 'Adam'
	}

	const context = new BloxContext()

	// When
	plugin.run({
		context: context,
		key: 'bind:text',
		value: 'name',
		variables: variables,
		buildContext: () => {
			return undefined
		}
	})

	// Then

	expect(context.props.text).toBe('Adam')

})

test('Bind plugin throws error when bound prop name is empty', async () => {

	// Given

	const plugin = new BloxPluginBind()
	
	const variables = {
		'name': 'Adam'
	}

	const context = new BloxContext()

	// When

	let thrownError: any = undefined
	try {
		plugin.run({
			context: context,
			key: 'bind:',
			value: 'name',
			variables: variables,
			buildContext: () => {
				return undefined
			}
		})
	} catch(error) {
		thrownError = error
	}

	// Then

	expect(thrownError?.message).toBe('The value for the prop name for bound variable key/value pairs must be a string with length > 0.')

})

test('Bind plugin throws error when bound binding name is not a string', async () => {

	// Given

	const plugin = new BloxPluginBind()
	
	const variables = {
		'name': 'Adam'
	}

	const context = new BloxContext()

	// When

	let thrownError: any = undefined
	try {
		plugin.run({
			context: context,
			key: 'bind:text',
			value: 1337,
			variables: variables,
			buildContext: () => {
				return undefined
			}
		})
	} catch(error) {
		thrownError = error
	}

	// Then

	expect(thrownError?.message).toBe(`The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof 1337} for bound value bind:text.`)

})
