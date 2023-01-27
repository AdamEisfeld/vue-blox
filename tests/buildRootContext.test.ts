import { test, expect } from 'vitest'
import type { BloxPluginInterface } from '../src'
import { buildRootContext } from 'src/composables/buildRootContext'
import TestLabelComponent from './TestLabelComponent.vue'
import type { ComponentPublicInstance } from 'vue'
import { TestPluginCrash } from './TestPluginCrash'
import exp from 'constants'
import { BloxPluginSlot } from 'src/classes/BloxPluginSlot'

test('buildRootContext empty params returns undefined context', async () => {

	// Given
	
	const view = undefined
	const variables = undefined
	const catalog = {}
	const plugins: BloxPluginInterface[] = []

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeUndefined()

})

test('buildRootContext undefined type string returns undefined context with error', async () => {

	// Given
	
	const view = {}
	const variables = undefined
	const catalog = {}
	const plugins: BloxPluginInterface[] = []

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeUndefined()
	expect(root.errors).toBeDefined()
	expect(root.errors![0].error.message).toEqual('No view type specified.')

})

test('buildRootContext returns correct props', async () => {

	// Given
	
	const view = {
		type: 'label',
		name: 'Tony Stark'
	}
	const variables = undefined
	const catalog = {}
	const plugins: BloxPluginInterface[] = []

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeDefined()
	expect(root.context?.props.name).toEqual('Tony Stark')

})

test('buildRootContext returns correct component', async () => {

	// Given
	
	const view = {
		type: 'label',
		name: 'Tony Stark'
	}
	const variables = undefined
	const catalog: Record<string, ComponentPublicInstance<any>> = {
		'label': TestLabelComponent
	}

	const plugins: BloxPluginInterface[] = []

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeDefined()
	expect(root.context?.component.name).toEqual('TestLabelComponent')

})

test('buildRootContext returns errors on failing', async () => {

	// Given
	
	const view = {
		type: 'label',
		name: 'Tony Stark'
	}
	const variables = undefined
	const catalog = {}
	const plugins: BloxPluginInterface[] = [
		new TestPluginCrash(undefined)
	]

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeDefined()
	expect(root.errors).toBeDefined()
	expect(root.errors?.length).toEqual(2)
	expect(root.errors![0].error.message).toEqual('Failed')
	expect(root.errors![0].view.name).toEqual('Tony Stark')

})

test('buildRootContext with nested errors returns flattened errors on failing', async () => {

	// Given
	
	const view = {
		type: 'label',
		name: 'Tony Stark',
		'slot:children': {
			type: 'label',
			name: 'Bruce Banner',
			shouldFail: true,
		}
	}
	const variables = undefined
	const catalog = {}
	const plugins: BloxPluginInterface[] = [
		new BloxPluginSlot(),
		new TestPluginCrash('shouldFail')
	]

	// When

	const root = buildRootContext({
		view: view,
		variables: variables,
		catalog: catalog,
		plugins: plugins
	})

	// Then

	expect(root.context).toBeDefined()
	expect(root.errors).toBeDefined()
	expect(root.errors?.length).toEqual(1)
	expect(root.errors![0].error.message).toEqual('Failed')
	expect(root.errors![0].view.name).toEqual('Bruce Banner')

})