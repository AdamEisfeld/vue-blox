import { BloxContext } from 'src/classes/BloxContext'
import { test, expect } from 'vitest'

test('BloxContext setProp replace key/value updates prop', async () => {

	// Given

	const context = new BloxContext()
	context.props = {
		'foo' : 'bar',
		'boo' : 'baz'
	}

	// Then

	expect(context.props.foo).toEqual('bar')

	// When

	context.setProp({
		propName: 'foo',
		value: 'agh'
	})

	// Then

	expect(context.props.foo).toEqual('agh')

})

test('BloxContext setProp new key/value adds prop', async () => {

	// Given

	const context = new BloxContext()
	context.props = {
		'foo' : 'bar',
		'boo' : 'baz'
	}

	// Then

	expect(context.props.doo).toBeUndefined()

	// When

	context.setProp({
		propName: 'doo',
		value: 'daz'
	})

	// Then

	expect(context.props.doo).toEqual('daz')

})

test('BloxContext setProp undefined deletes the prop', async () => {

	// Given

	const context = new BloxContext()
	context.props = {
		'foo' : 'bar',
		'boo' : 'baz'
	}

	// Then

	expect(context.props.foo).toEqual('bar')

	// When

	context.setProp({
		propName: 'foo',
		value: undefined
	})

	// Then

	expect(context.props.foo).toBeUndefined()

})

test('BloxContext setSlot replace key/value updates slot', async () => {

	// Given

	const innerContext = new BloxContext()
	innerContext.props.name = 'Tony Stark'

	const context = new BloxContext()
	context.slots = {
		'foo' : [innerContext]
	}

	// Then

	expect(context.slots.foo).toBeDefined()
	expect(context.slots.foo[0].props.name).toEqual('Tony Stark')

	// When

	const newInnerContext = new BloxContext()
	newInnerContext.props.name = 'Bruce Banner'

	context.setSlot({
		slotName: 'foo',
		children: [newInnerContext]
	})

	// Then

	expect(context.slots.foo).toBeDefined()
	expect(context.slots.foo[0].props.name).toEqual('Bruce Banner')

})

test('BloxContext setSlot new key/value adds slot', async () => {

	// Given

	const context = new BloxContext()

	// Then

	expect(context.slots.foo).toBeUndefined()

	// When

	const newInnerContext = new BloxContext()
	newInnerContext.props.name = 'Bruce Banner'

	context.setSlot({
		slotName: 'foo',
		children: [newInnerContext]
	})

	// Then

	expect(context.slots.foo).toBeDefined()
	expect(context.slots.foo[0].props.name).toEqual('Bruce Banner')

})

test('BloxContext setSlot undefined deletes the slot', async () => {

	// Given

	const innerContext = new BloxContext()
	innerContext.props.name = 'Tony Stark'

	const context = new BloxContext()
	context.slots = {
		'foo' : [innerContext]
	}

	// Then

	expect(context.slots.foo).toBeDefined()
	expect(context.slots.foo[0].props.name).toEqual('Tony Stark')

	// When

	const newInnerContext = new BloxContext()
	newInnerContext.props.name = 'Bruce Banner'

	context.setSlot({
		slotName: 'foo',
		children: []
	})

	// Then

	expect(context.slots.foo).toBeUndefined()

})
