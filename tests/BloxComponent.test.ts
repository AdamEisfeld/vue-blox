import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { BloxComponent, BloxError } from '../src'
import { TestPluginSmileys } from './TestPluginSmileys'
import { TestPluginCrash } from './TestPluginCrash'
import TestLabelComponent from './TestLabelComponent.vue'
import TestButtonCounterComponent from './TestButtonCounterComponent.vue'
import TestStackComponent from 'tests/TestStackComponent.vue'
import TestStackNoNameComponent from './TestStackNoNameComponent.vue'
import { BloxGlobal } from 'src/classes/BloxGlobal'

test('Empty settings passed to Blox Component does not crash', async () => {

	// Given

	const wrapper = mount(BloxComponent, {
		props: undefined,
	})

})

test('Simple blox component is rendered', async () => {

	// Given

	const catalog = {
		'label' : TestLabelComponent
	}

	const view = {
		'type': 'label',
		'text': 'Hello, world!'
	}
	
	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: undefined,
			plugins: undefined,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})

test('Blox component with bindings is rendered, and modifying bindings programmatically updates render', async () => {

	console.log('Start')
	// Given

	const catalog = {
		'label' : TestLabelComponent
	}

	const variables = reactive({
		'message': 'Hello, world!'
	})

	const view = {
		'type': 'label',
		'bind:text': 'message'
	}
	
	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: variables,
			plugins: undefined,
		},
	})

	// Then

	await wrapper.vm.$nextTick()

	expect(wrapper.text()).toContain('Hello, world!')

	// And when

	variables.message = 'Updated message'
	await wrapper.vm.$nextTick()

	// Then

	expect(wrapper.text()).toContain('Updated message')

})

test('Blox component with bindings is rendered, and modifying bindings within component UI updates bound values', async () => {

	// Given

	const catalog = {
		'buttonCounter' : TestButtonCounterComponent
	}

	const variables = reactive({
		'testCount': 5
	})

	const view = {
		'type': 'buttonCounter',
		'bind:count': 'testCount'
	}
	
	// When

	// const bindings = getBloxBindings(inputBindings)

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: variables,
			plugins: undefined,
		},
	})

	// Then

	expect(variables.testCount).toBe(5)

	// And when

	const button = wrapper.findComponent(TestButtonCounterComponent)
	button.trigger('click')
	
	// Then

	expect(variables.testCount).toBe(6)

})

test('Blox component with single slot is rendered', async () => {

	// Given

	const catalog = {
		'label' : TestLabelComponent,
		'stack' : TestStackComponent,
	}

	const view = {
		'type': 'stack',
		'slot:children': [
			{
				'type': 'label',
				'text': 'Hello, world!'
			}
		]
	}
	
	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: undefined,
			plugins: undefined,
		},
	})

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text()).toContain('Hello, world!')

})

test('Blox component with single slot with slot name missing is rendered using default slot name', async () => {

	// Given

	const catalog = {
		'label' : TestLabelComponent,
		'stack' : TestStackNoNameComponent,
	}

	const view = {
		'type': 'stack',
		'slot:': [
			{
				'type': 'label',
				'text': 'Hello, world!'
			}
		]
	}
	
	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: undefined,
			plugins: undefined,
		},
	})

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text()).toContain('Hello, world!')

})

test('Blox Component uses plugins', async () => {

	// Given

	const catalog = {
		'label' : TestLabelComponent
	}

	const view = {
		'type': 'label',
		'text': 'Some [smiley] people [smiley] use [smiley] emojis [smiley] too [smiley] much.'
	}

	const plugin = new TestPluginSmileys()
	
	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: undefined,
			plugins: [plugin],
		},
	})
	await wrapper.vm.$nextTick()

	// Then

	expect(wrapper.text()).toContain('Some 😊 people 😊 use')

})

test('Blox Component emits error on running crashing plugin', async () => {

	// Given

	const catalog = {
		'label' : TestLabelComponent
	}

	const view = {
		'type': 'label',
		'text': 'This is a test.'
	}

	const plugin = new TestPluginCrash()
	
	let thrownError: any = undefined
	const onError = (error: BloxError) => {
		thrownError = error
	}

	// When

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
			variables: undefined,
			plugins: [plugin],
			"onHandleError": onError
		},
	})
	await wrapper.vm.$nextTick()

	// Then

	expect(thrownError).toBeDefined()

})
