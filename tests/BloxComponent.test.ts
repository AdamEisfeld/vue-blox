import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { getBloxBindings, getBloxView, getBloxCatalog, BloxComponent } from '../src'
import { TestValuePlugin } from './TestValuePlugin'
import TestLabelComponent from './TestLabelComponent.vue'
import TestButtonCounterComponent from './TestButtonCounterComponent.vue'
import TestStackComponent from 'tests/TestStackComponent.vue'
import TestStackNoNameComponent from './TestStackNoNameComponent.vue'

test('Empty settings passed to Blox Component does not crash', async () => {

	// Given

	const wrapper = mount(BloxComponent, {
		props: undefined,
	})

})

test('Simple blox component is rendered', async () => {

	// Given

	const catalog = getBloxCatalog({
		'label' : TestLabelComponent
	})

	const inputView = {
		'type': 'label',
		'text': 'Hello, world!'
	}
	
	// When

	const view = getBloxView(inputView, undefined, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: undefined,
			valuePlugins: undefined,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})

test('Blox component with bindings is rendered, and modifying bindings programmatically updates render', async () => {

	// Given

	const catalog = getBloxCatalog({
		'label' : TestLabelComponent
	})

	const inputBindings = {
		'message': 'Hello, world!'
	}

	const inputView = {
		'type': 'label',
		'bind:text': 'message'
	}
	
	// When

	const bindings = getBloxBindings(inputBindings)
	const view = getBloxView(inputView, bindings, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: bindings,
			valuePlugins: undefined,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

	// And when

	bindings.entries.message.value = 'Updated message'
	await wrapper.vm.$nextTick()

	// Then

	expect(wrapper.text()).toContain('Updated message')

})

test('Blox component with bindings is rendered, and modifying bindings within component UI updates bound values', async () => {

	// Given

	const catalog = getBloxCatalog({
		'buttonCounter' : TestButtonCounterComponent
	})

	const inputBindings = {
		'testCount': 5
	}

	const inputView = {
		'type': 'buttonCounter',
		'bind:count': 'testCount'
	}
	
	// When

	const bindings = getBloxBindings(inputBindings)
	const view = getBloxView(inputView, bindings, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: bindings,
			valuePlugins: undefined,
		},
	})

	// Then

	expect(bindings.entries.testCount.value).toBe(5)

	// And when

	const button = wrapper.findComponent(TestButtonCounterComponent)
	button.trigger('click')

	// Then

	expect(bindings.entries.testCount.value).toBe(6)

})

test('Blox component with single slot is rendered', async () => {

	// Given

	const catalog = getBloxCatalog({
		'label' : TestLabelComponent,
		'stack' : TestStackComponent,
	})

	const inputView = {
		'type': 'stack',
		'slot:children': [
			{
				'type': 'label',
				'text': 'Hello, world!'
			}
		]
	}
	
	// When

	const view = getBloxView(inputView, undefined, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: undefined,
			valuePlugins: undefined,
		},
	})

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text()).toContain('Hello, world!')

})

test('Blox component with single slot with slot name missing is rendered using default slot name', async () => {

	// Given

	const catalog = getBloxCatalog({
		'label' : TestLabelComponent,
		'stack' : TestStackNoNameComponent,
	})

	const inputView = {
		'type': 'stack',
		'slot:': [
			{
				'type': 'label',
				'text': 'Hello, world!'
			}
		]
	}
	
	// When

	const view = getBloxView(inputView, undefined, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: undefined,
			valuePlugins: undefined,
		},
	})

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text()).toContain('Hello, world!')

})

test('Blox Component uses key plugins', async () => {

	// Given

	const catalog = getBloxCatalog({
		'label' : TestLabelComponent
	})

	const inputView = {
		'type': 'label',
		'text': 'Some [smiley] people [smiley] use [smiley] emojis [smiley] too [smiley] much.'
	}

	const plugin = new TestValuePlugin()
	
	// When

	const view = getBloxView(inputView, undefined, undefined)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			bindings: undefined,
			valuePlugins: [plugin],
		},
	})

	// Then

	expect(wrapper.text()).toContain('Some 😊 people 😊 use')

})
