import { test, expect } from 'vitest'
import { getBloxBindings } from '../src'

test('Reactive bindings are created', async () => {

	// Given

	const inputVariables = {
		'name': 'Adam',
		'age': 42
	}
	
	// When

	const bindings = getBloxBindings(inputVariables)

	// Then

	expect(bindings.entries.name.value).toBe('Adam')

})

test('Undefined input variables still create usable bindings', async () => {

	// Given

	const inputVariables = undefined
	
	// When

	const bindings = getBloxBindings(inputVariables)

	// Then

	expect(bindings).toBeDefined()

})
