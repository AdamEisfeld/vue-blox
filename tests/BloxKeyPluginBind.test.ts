import { test, expect } from 'vitest'
import { getBloxBindings, getBloxView, BloxError } from '../src'
import { BloxKeyPluginBind } from '../src/classes/BloxKeyPluginBind'

test('Bind plugin creates reactive bindings', async () => {

	// Given

	const plugin = new BloxKeyPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	// When

	const bindings = getBloxBindings(inputBindings)
	const result = plugin.handleKey('bind:text', 'name', bindings, (nestedInputView: any) => {
		return getBloxView(nestedInputView, bindings, undefined)
	})

	// Then

	expect(result).toBeDefined()
	expect(result!.props).toBeDefined()
	expect(result!.props!.text.value).toBe('Adam')

})

test('Bind plugin throws error when bound prop name is empty', async () => {

	// Given

	const plugin = new BloxKeyPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	// When

	const bindings = getBloxBindings(inputBindings)

	let thrownError: BloxError | undefined = undefined
	try {
		const result = plugin.handleKey('bind:', 'name', bindings, (nestedInputView: any) => {
			return getBloxView(nestedInputView, bindings, undefined)
		})
	} catch(error) {
		thrownError = error as BloxError
	}

	// Then

	expect(thrownError?.message).toBe('Bind parsing failed.')
	expect(thrownError?.debugMessage).toBe('The value for the prop name for bound variable key/value pairs must be a string with length > 0.')
	expect(thrownError?.context.key).toBe('bind:')
	expect(thrownError?.context.value).toBe('name')

})

test('Bind plugin throws error when bound binding name is not a string', async () => {

	// Given

	const plugin = new BloxKeyPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	// When

	const bindings = getBloxBindings(inputBindings)

	let thrownError: BloxError | undefined = undefined
	try {
		const result = plugin.handleKey('bind:text', 1337, bindings, (nestedInputView: any) => {
			return getBloxView(nestedInputView, bindings, undefined)
		})
	} catch(error) {
		thrownError = error as BloxError
	}

	// Then

	expect(thrownError?.message).toBe('Bind parsing failed.')
	expect(thrownError?.debugMessage).toBe(`The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof 1337} for bound value bind:text.`)
	expect(thrownError?.context.key).toBe('bind:text')
	expect(thrownError?.context.value).toBe(1337)

})
