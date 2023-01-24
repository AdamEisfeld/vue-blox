import { test, expect } from 'vitest'
import type { BloxError } from '../src'
import { BloxPluginBind } from '../src/classes/BloxPluginBind'

test('Bind plugin creates reactive bindings', async () => {

	// Given

	const plugin = new BloxPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	const computedProps: Record<string, any> = {}
	const computedSlots: Record<string, any[]> = {}
	
	const setProp = (propName: string, value: any) => {
		if (value) {
			computedProps[propName] = value
		} else {
			delete computedProps[propName]
		}
	}

	const setSlot = (slotName: string, views: any[]) => {
		computedSlots[slotName] = views
	}

	// When

	// const bindings = getBloxBindings(inputBindings)
	plugin.run('bind:text', 'name', inputBindings, setProp, setSlot)

	// Then

	expect(computedProps).toBeDefined()
	expect(computedProps.text).toBe('Adam')

})

test('Bind plugin throws error when bound prop name is empty', async () => {

	// Given

	const plugin = new BloxPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	const computedProps: Record<string, any> = {}
	const computedSlots: Record<string, any[]> = {}
	
	const setProp = (propName: string, value: any) => {
		if (value) {
			computedProps[propName] = value
		} else {
			delete computedProps[propName]
		}
	}

	const setSlot = (slotName: string, views: any[]) => {
		computedSlots[slotName] = views
	}

	// When

	// const bindings = getBloxBindings(inputBindings)

	let thrownError: BloxError | undefined = undefined
	try {
		plugin.run('bind:', 'name', inputBindings, setProp, setSlot)
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

	const plugin = new BloxPluginBind()
	
	const inputBindings = {
		'name': 'Adam'
	}

	const computedProps: Record<string, any> = {}
	const computedSlots: Record<string, any[]> = {}
	
	const setProp = (propName: string, value: any) => {
		if (value) {
			computedProps[propName] = value
		} else {
			delete computedProps[propName]
		}
	}

	const setSlot = (slotName: string, views: any[]) => {
		computedSlots[slotName] = views
	}

	// When

	// const bindings = getBloxBindings(inputBindings)

	let thrownError: BloxError | undefined = undefined
	try {
		plugin.run('bind:text', 1337, inputBindings, setProp, setSlot)
	} catch(error) {
		thrownError = error as BloxError
	}

	// Then

	expect(thrownError?.message).toBe('Bind parsing failed.')
	expect(thrownError?.debugMessage).toBe(`The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof 1337} for bound value bind:text.`)
	expect(thrownError?.context.key).toBe('bind:text')
	expect(thrownError?.context.value).toBe(1337)

})
