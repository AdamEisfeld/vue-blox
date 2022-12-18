import { test, expect } from 'vitest'
import { BloxCatalog } from '../src'
import TestLabelComponent from './TestLabelComponent.vue'

test('Catalog lookup returns correct component', async () => {

	// Given

	const expected = TestLabelComponent
	const catalog = new BloxCatalog()
	catalog.register({
		'label' : expected
	})

	// When

	const actual = catalog.getComponentForType('label')

	// Then

	expect(expected.name).toBe(actual.name)

})
