import { BloxContext } from '../src/classes/BloxContext'
import { test, expect } from 'vitest'
import { BloxPluginSlot } from '../src/classes/BloxPluginSlot'
import { buildRootContext } from 'src/composables/buildRootContext'

test('Slot plugin creates single child for single slot', async () => {

	// Given

	const plugin = new BloxPluginSlot()
	const context = new BloxContext()

	// When

	const slots = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	plugin.run({
		context: context,
		key: 'slot:children',
		value: slots,
		variables: undefined,
		buildContext: ({ view, variables }) => {
			return buildRootContext({
				view: view,
				variables: variables,
				catalog: {},
				plugins: [plugin]
			}).context
		}
	})

	// Then

	expect(context.slots.children).toBeDefined()
	expect(context.slots.children.length).toBe(1)
	expect(context.slots.children[0].props.text).toBe('Hello, world!')

})

test('Slot plugin creates multiple children for single slot', async () => {

	// Given

	const plugin = new BloxPluginSlot()
	const context = new BloxContext()

	// When

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

	plugin.run({
		context: context,
		key: 'slot:children',
		value: slots,
		variables: undefined,
		buildContext: ({ view, variables }) => {
			return buildRootContext({
				view: view,
				variables: variables,
				catalog: {},
				plugins: [plugin]
			}).context
		}
	})

	// Then

	expect(context.slots.children).toBeDefined()
	expect(context.slots.children.length).toBe(2)
	expect(context.slots.children[1].props.text).toBe('Child 2')

})

test('Slot plugin allows slots to be specified with zero children', async () => {

	// Given

	const plugin = new BloxPluginSlot()
	const context = new BloxContext()

	// When

	plugin.run({
		context: context,
		key: 'slot:children',
		value: [],
		variables: undefined,
		buildContext: () => {
			return undefined
		}
	})

	// Then

	expect(Object.keys(context.slots).length).toEqual(0)

})

test('Slot plugin allows slots to be specified with undefined children', async () => {

	// Given

	const plugin = new BloxPluginSlot()
	const context = new BloxContext()

	// When

	plugin.run({
		context: context,
		key: 'slot:children',
		value: undefined,
		variables: undefined,
		buildContext: () => {
			return undefined
		}
	})

	// Then

	expect(Object.keys(context.slots).length).toEqual(0)

})

test('Slot plugin throws error when unable to obtain child context for slot', async () => {

	// Given

	const plugin = new BloxPluginSlot()
	const context = new BloxContext()

	// When

	const slots = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	let thrownError: any = undefined
	try {
		plugin.run({
			context: context,
			key: 'slot:children',
			value: slots,
			variables: undefined,
			buildContext: ({ view, variables }) => {
				return undefined
			}
		})
	} catch(error) {
		thrownError = error
	}

	// Then

	expect(context.slots.children).toBeUndefined()
	expect(thrownError).toBeDefined()
	expect(thrownError.message).toEqual('Unable to obtain nested view for slot "children".')
})
