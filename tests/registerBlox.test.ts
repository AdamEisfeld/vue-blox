import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { registerBlox, getBloxView, BloxComponent } from '../src'
import TestLabelComponent from './TestLabelComponent.vue'

test('Plugin installation', async () => {

	// Given
	  
	const blox = registerBlox({
		catalog: {
			'label': TestLabelComponent,
		}
	})

	// When

	const inputModel = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const view = getBloxView(inputModel, undefined)

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
