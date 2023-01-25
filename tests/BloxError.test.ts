import { test, expect } from 'vitest'
import { BloxError } from '../src/classes/BloxError'

test('asBloxError returns BloxError for valid error', async () => {

	// Given

	const error = new BloxError('Some Message', 'Some Debug Message', {
		'environment': 'tests'
	})

	// When

	const asBloxError = BloxError.asBloxError(error)

	// Then

	expect(asBloxError).toBeDefined()

})

test('asBloxError returns undefined for invalid error', async () => {

	// Given

	const error = new Error('Some Message')

	// When

	const asBloxError = BloxError.asBloxError(error)

	// Then

	expect(asBloxError).toBeUndefined()

})