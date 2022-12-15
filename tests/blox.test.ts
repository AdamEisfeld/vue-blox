import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createBlox, BloxCatalog, BloxModel, useBlox } from '../src'
import BloxView from '../src/BloxView.vue'
import TestLabelComponent from './TestLabelComponent.vue'
import TestButtonCounterComponent from './TestButtonCounterComponent.vue'
import TestStackComponent from './TestStackComponent.vue'
import TestTwoSlotsComponent from './TestTwoSlotsComponent.vue'

test('Empty settings passed to Blox View does not crash', async () => {

	// Given

	const wrapper = mount(BloxView, {
		props: undefined,
	})

})

test('Correct component is returned for component type name', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const component = catalog.getComponentForType('label')

	// Then

	expect(component.name).toBe(TestLabelComponent.name)

})

test('No component is returned for invalid type name', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const component = catalog.getComponentForType('foo')

	// Then

	expect(component).toBeUndefined()

})

test('Correct component is mounted for input model', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'label',
		'message': 'Hello, world!'
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})

test('No component is mounted for invalid input model', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'foo',
		'message': 'Hello, world!'
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const labels = wrapper.findAllComponents(TestLabelComponent)

	// // Then

	expect(labels.length).toBe(0)

})

test('No component is mounted for undefined input model', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputModel = undefined

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const labels = wrapper.findAllComponents(TestLabelComponent)

	// // Then

	expect(labels.length).toBe(0)

})

test('No component is mounted for undefined output model', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputModel = undefined

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: undefined,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const labels = wrapper.findAllComponents(TestLabelComponent)

	// // Then

	expect(labels.length).toBe(0)

})

test('Model variables are inserted into component', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		'bind:message': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, variables!')

})

test('Invalid model variables are not inserted into component', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		'bind:message': 1
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text().length).toBe(0)

})

test('Empty variable and prop name for model variables are not inserted into component', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		':': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text().length).toBe(0)

})

test('Invalid prop name for model variables are not inserted into component', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		'bind:foo': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text().length).toBe(0)

})

test('Empty prop name for model variables are not inserted into component', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		'bind:': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const label = wrapper.findComponent(TestLabelComponent)

	// Then

	expect(label.text().length).toBe(0)

})

test('Component is updated when model variables change', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': 'Hello, variables!'
	}

	const inputModel = {
		'type': 'label',
		'bind:message': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	variables['testMessage'].value = 'Hello, again!'

	await wrapper.vm.$nextTick()

	// Then

	expect(wrapper.text()).toContain('Hello, again!')

})


test('Model variables are updated when component triggers a change', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'buttonCounter',
		component: TestButtonCounterComponent
	})

	// When

	const inputVariables = {
		'testCount': 0
	}

	const inputModel = {
		'type': 'buttonCounter',
		'bind:count': 'testCount'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const button = wrapper.findComponent(TestButtonCounterComponent)
	button.trigger('click')

	// Then

	expect(variables['testCount'].value).toBe(1)

})


test('Component with one slot, empty child', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'stack': TestStackComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'stack',
		'slot:children': {}
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const labels = wrapper.findAllComponents(TestLabelComponent)
	expect(labels.length).toBe(0)

})


test('Component with one slot, invalid child', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'stack': TestStackComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'stack',
		'slot:children': 'This is wrong'
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const labels = wrapper.findAllComponents(TestLabelComponent)
	expect(labels.length).toBe(0)

})


test('Component with one slot, empty slot name specified', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'stack': TestStackComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'stack',
		'slot:': {}
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const labels = wrapper.findAllComponents(TestLabelComponent)
	expect(labels.length).toBe(0)

})

test('Component with one slot, one child', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'stack': TestStackComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'stack',
		'slot:children': {
			'type': 'label',
			'message': 'First child',
		}
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const label = wrapper.findComponent(TestLabelComponent)
	expect(label.text()).toContain('First child')

})


test('Component with one slot, two children', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'stack': TestStackComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'stack',
		'slot:children': [
			{
				'type': 'label',
				'message': 'First child',
			},
			{
				'type': 'label',
				'message': 'Second child',
			}
		]
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const labels = wrapper.findAllComponents(TestLabelComponent)
	expect(labels.length).toBe(2)
	expect(labels[0].text()).toContain('First child')
	expect(labels[1].text()).toContain('Second child')

})

test('Component with two slots, two children', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.registerAll({
		'twoSlots': TestTwoSlotsComponent,
		'label': TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'twoSlots',
		'slot:header': [
			{
				'type': 'label',
				'message': 'This is a header',
			},
		],
		'slot:body': [
			{
				'type': 'label',
				'message': 'This is a body',
			},
		]
	}

	const { model, variables } = BloxModel.from(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	// Then

	const labels = wrapper.findAllComponents(TestLabelComponent)
	expect(labels.length).toBe(2)
	expect(labels[0].text()).toContain('This is a header')
	expect(labels[1].text()).toContain('This is a body')

})

test('Composable useBlox function', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputModel = {
		'type': 'label',
		'message': 'Hello, world!'
	}

	const { model, variables } = useBlox(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})

test('Plugin installation', async () => {

	// Given
	  
	const blox = createBlox({
		'label': TestLabelComponent,
	})

	// When

	const inputModel = {
		'type': 'label',
		'message': 'Hello, world!'
	}

	const { model, variables } = useBlox(inputModel, undefined)

	const wrapper = mount(BloxView, {
		props: {
			model: model,
			variables: variables,
		},
		global: {
			plugins: [blox]
		}
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})

test('Replacing model but keeping variables keeps current variable values', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'buttonCounter',
		component: TestButtonCounterComponent
	})
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testCount': 0
	}

	const inputModel = {
		'type': 'buttonCounter',
		'bind:count': 'testCount'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)
	
	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	await wrapper.vm.$nextTick()

	const button = wrapper.findComponent(TestButtonCounterComponent)
	button.trigger('click')

	// Then

	expect(variables['testCount'].value).toBe(1)

	// And when

	const updatedInputModel = {
		'type': 'label',
		'bind:message': 'testCount'
	}

	const updated = BloxModel.from(updatedInputModel, inputVariables, variables)
	wrapper.setProps({
		model: updated.model,
		variables: updated.variables
	})

	expect(updated.variables['testCount'].value).toBe(1)

})


test('Model variables with mustache templates work', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': '{{ name }} is {{age}} years old, and created Vue Blox in {{ year }}.',
		'name': 'Adam',
		'age': 32,
		'year': 2022
	}

	const inputModel = {
		'type': 'label',
		'bind:message': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	// Then

	expect(wrapper.text()).toContain('Adam is 32 years old, and created Vue Blox in 2022.')

})

test('Model variables with invalid mustache templates work', async () => {

	// Given

	const catalog = new BloxCatalog()
	catalog.register({
		type: 'label',
		component: TestLabelComponent
	})

	// When

	const inputVariables = {
		'testMessage': '{{ this should not render as mustache.',
		'name': 'Adam',
		'age': 32,
		'year': 2022
	}

	const inputModel = {
		'type': 'label',
		'bind:message': 'testMessage'
	}

	const { model, variables } = BloxModel.from(inputModel, inputVariables)

	const wrapper = mount(BloxView, {
		props: {
			catalog: catalog,
			model: model,
			variables: variables,
		},
	})

	// Then

	expect(wrapper.text()).toContain('{{ this should not render as mustache.')

})
