import { test, expect } from 'vitest'
import { getBloxBindings, getBloxView, BloxError } from '../src'
import { TestKeyPlugin } from './TestKeyPlugin'

test('Simple blox view is created', async () => {

	// Given

	const inputView = {
		'type': 'label',
		'text': 'Hello, world!'
	}
	
	// When

	const view = getBloxView(inputView, undefined, undefined)

	// Then

	expect(view.type).toBe('label')
	expect(view.props.text.value).toBe('Hello, world!')

})

test('Blox view with invalid type throws error', async () => {

	// Given

	const inputView = {
		'type': 1337,
		'text': 'Hello, world!'
	}
	
	// When

	let thrownError: BloxError | undefined = undefined
	try {
		const view = getBloxView(inputView, undefined, undefined)
	} catch(error) {
		thrownError = error as BloxError
	}

	// Then

	expect(thrownError).toBeDefined()
	expect(thrownError?.message).toBe('View parsing failed.')
	expect(thrownError?.debugMessage).toBe('The value for the "type" key on a view must be a string.')

})

test('Blox view with bindings is created, and bindings are correct.', async () => {

	// Given

	const inputBindings = {
		'name': 'Adam',
	}

	const inputView = {
		'type': 'label',
		'bind:text': 'name'
	}
	
	// When

	const bindings = getBloxBindings(inputBindings)
	const view = getBloxView(inputView, bindings, undefined)

	// Then

	expect(view.type).toBe('label')
	expect(view.props.text.value).toBe('Adam')

})

test('Blox view with plugins is created, and plugins are used.', async () => {

	// Given

	const inputView = {
		'type': 'label',
		'toUpper:name': 'adam'
	}
	
	// When

	const view = getBloxView(inputView, undefined, [new TestKeyPlugin()])

	// Then

	expect(view.type).toBe('label')
	expect(view.props.name).toBe('ADAM')

})

test('Blox view with slots is created, and slots are returned.', async () => {

	// Given

	const inputView = {
		'type': 'stack',
		'slot:children': [
			{
				'type': 'label',
				'text': 'Child 1'
			},
			{
				'type': 'label',
				'text': 'Child 2'
			}
		]
	}
	
	// When

	const view = getBloxView(inputView, undefined, [new TestKeyPlugin()])

	// Then

	expect(view.type).toBe('stack')
	expect(Object.keys(view.slots).length).toBe(1)
	expect(view.slots['children'].length).toBe(2)
	expect(view.slots['children'][1].props.text.value).toBe('Child 2')

})
