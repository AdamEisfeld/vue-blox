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

	const inputView = {
		'type': 'label',
		'text': 'Hello, world!'
	}

	const wrapper = mount(BloxComponent, {
		props: {
			view: inputView,
		},
		global: {
			plugins: [blox]
		}
	})

	// Then

	expect(wrapper.text()).toContain('Hello, world!')

})
