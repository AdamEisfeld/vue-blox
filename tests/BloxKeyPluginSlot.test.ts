import { test, expect } from 'vitest'
import { getBloxBindings, getBloxView } from '../src'
import { BloxKeyPluginSlot } from '../src/classes/BloxKeyPluginSlot'

test('Slot plugin creates single child for single slot', async () => {

	// Given

	const plugin = new BloxKeyPluginSlot()

	// When

	const bindings = getBloxBindings({})

	const slots = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const result = plugin.handleKey('slot:children', slots, bindings, (nestedInputView: any) => {
		return getBloxView(nestedInputView, bindings, undefined)
	})

	// Then

	expect(result).toBeDefined()
	expect(result!.slots).toBeDefined()
	expect(result!.slots!.children.length).toBe(1)
	expect(result!.slots!.children[0].props.text.value).toBe('Hello, world!')

})

test('Slot plugin creates multiple children for single slot', async () => {

	// Given

	const plugin = new BloxKeyPluginSlot()

	// When

	const bindings = getBloxBindings({})

	const slots = [
		{
			'type': 'label',
			'text': 'Child 1'
		},
		{
			'type': 'label',
			'text': 'Child 2'
		}
	]

	const result = plugin.handleKey('slot:children', slots, bindings, (nestedInputView: any) => {
		return getBloxView(nestedInputView, bindings, undefined)
	})

	// Then

	expect(result).toBeDefined()
	expect(result!.slots).toBeDefined()
	expect(result!.slots!.children.length).toBe(2)
	expect(result!.slots!.children[1].props.text.value).toBe('Child 2')

})

test('Slot plugin allows slots to be specified with zero children', async () => {

	// Given

	const plugin = new BloxKeyPluginSlot()

	// When

	const bindings = getBloxBindings({})

	const result = plugin.handleKey('slot:children', [], bindings, (nestedInputView: any) => {
		return getBloxView(nestedInputView, bindings, undefined)
	})

	// Then

	expect(result).toBeUndefined()

})

test('Slot plugin falls back to using default slot name when not specified', async () => {

	// Given

	const plugin = new BloxKeyPluginSlot()

	// When

	const bindings = getBloxBindings({})

	const slots = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const result = plugin.handleKey('slot:', slots, bindings, (nestedInputView: any) => {
		return getBloxView(nestedInputView, bindings, undefined)
	})

	// Then

	expect(result).toBeDefined()
	expect(result!.slots).toBeDefined()
	expect(result!.slots!.default.length).toBe(1)
	expect(result!.slots!.default[0].props.text.value).toBe('Hello, world!')

})
