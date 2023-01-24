import { test, expect } from 'vitest'
import { BloxPluginSlot } from '../src/classes/BloxPluginSlot'

test('Slot plugin creates single child for single slot', async () => {

	// Given

	const plugin = new BloxPluginSlot()

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

	// const bindings = getBloxBindings({})

	const slots = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	plugin.run('slot:children', slots, {}, setProp, setSlot)

	// Then

	expect(computedSlots).toBeDefined()
	expect(computedSlots.children.length).toBe(1)
	expect(computedSlots.children[0].text).toBe('Hello, world!')

})

test('Slot plugin creates multiple children for single slot', async () => {

	// Given

	const plugin = new BloxPluginSlot()

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

	// const bindings = getBloxBindings({})

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

	plugin.run('slot:children', slots, {}, setProp, setSlot)

	// Then

	expect(computedSlots).toBeDefined()
	expect(computedSlots.children.length).toBe(2)
	expect(computedSlots.children[1].text).toBe('Child 2')

})

test('Slot plugin allows slots to be specified with zero children', async () => {

	// Given

	const plugin = new BloxPluginSlot()

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

	// const bindings = getBloxBindings({})

	plugin.run('slot:children', [], {}, setProp, setSlot)

	// Then

	expect(computedSlots).toBeDefined()

})
