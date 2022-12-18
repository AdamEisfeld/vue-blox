import { test, expect } from 'vitest'
import { getBloxCatalog } from '../src'
import TestLabelComponent from './TestLabelComponent.vue'

test('Composable catalog lookup returns correct component', async () => {

	// Given

	const expected = TestLabelComponent
	const catalog = getBloxCatalog({
		'label' : expected
	})

	// When

	const actual = catalog.getComponentForType('label')

	// Then

	expect(expected.name).toBe(actual.name)

})
