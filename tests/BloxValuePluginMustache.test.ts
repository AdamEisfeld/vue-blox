import { test, expect } from 'vitest'
import { BloxValuePluginMustache } from '../src/classes/BloxValuePluginMustache'
import type { BloxError } from '../src'

test('Mustache plugin renders simple mustache', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	const result = plugin.handleValue('{{ message }}', {
		message: 'Hello, world!'
	})

	// Then

	expect(result).toBe('Hello, world!')

})

test('Mustache plugin renders complex mustache', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	const result = plugin.handleValue('{{ name }} is {{ age }} years old and enjoys {{ #interests }}{{.}}, {{ /interests }}.', {
		name: 'Adam',
		age: 32,
		interests: [
			'carpentry',
			'coding',
			'quantum physics'
		]
	})

	// Then

	expect(result).toBe('Adam is 32 years old and enjoys carpentry, coding, quantum physics, .')

})

test('Mustache plugin renders self-referential mustache', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	const result = plugin.handleValue('{{{ quote }}}', {
		name: 'Adam',
		age: 32,
		summary: '{{ name }}, {{ age }}',
		message: 'Mess with the best, die like the rest.',
		quote: '"{{ message }}" - {{ summary }}'
	})

	// Then

	expect(result).toBe('"Mess with the best, die like the rest." - Adam, 32')

})

test('Mustache plugin ignores values that are not text', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	const result = plugin.handleValue(1337, {
		message: 'Hello, world!'
	})

	// Then

	expect(result).toBe(1337)

})

test('Mustache plugin ignores values that do not contain double brackets', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	const result = plugin.handleValue('Welcome to the jungle', {
		message: 'Hello, world!'
	})

	// Then

	expect(result).toBe('Welcome to the jungle')

})

test('Mustache plugin throws error on invalid mustache', async () => {

	// Given

	const plugin = new BloxValuePluginMustache()

	// When

	let thrownError: BloxError | undefined = undefined
	try {
		const result = plugin.handleValue('{{# message }}', {
			message: '{{ foo }}'
		})
	} catch(error) {
		thrownError = error as BloxError
	}

	// Then

	expect(thrownError?.message).toBe('Mustache parsing failed.')
	expect(thrownError?.debugMessage).toContain('The call to runMustache() for value {{# message }} threw the error:')

})