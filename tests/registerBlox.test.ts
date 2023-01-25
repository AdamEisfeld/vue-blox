import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { registerBlox, BloxComponent } from '../src'
import TestLabelComponent from './TestLabelComponent.vue'

test('Plugin installation', async () => {

	// Given
	
	const blox = registerBlox({
		catalog: {
			'label': TestLabelComponent,
		}
	})

	// When

	const view = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const wrapper = mount(BloxComponent, {
		props: {
			view: view,
		},
		global: {
			plugins: [blox]
		}
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})


test('Plugin installation with undefined catalog', async () => {

	// Given
	  
	const blox = registerBlox()

	// When

	const catalog = {
		'label': TestLabelComponent,
	}

	const view = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const wrapper = mount(BloxComponent, {
		props: {
			catalog: catalog,
			view: view,
		},
		global: {
			plugins: [blox]
		}
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})
