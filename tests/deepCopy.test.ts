import { test, expect } from 'vitest'
import { deepCopy } from 'src/composables/deepCopy'

test('deepCopy copies primitive values', async () => {

	// Given
	
	const input = {
		name: 'Tony',
		age: 32,
		score: 1337.7331,
		isAlive: true,
	}

	// When

	const output = deepCopy(input)

	// Then

	expect(output.name).toBe('Tony')
	expect(output.age).toBe(32)
	expect(output.score).toBe(1337.7331)
	expect(output.isAlive).toBe(true)

})

test('deepCopy copies array of primitive values', async () => {

	// Given
	
	const input = {
		name: 'Tony',
		friends: [
			'Vision',
			'Bruce',
		]
	}

	// When

	const output = deepCopy(input)

	// Then

	expect(output.friends.length).toBe(2)
	expect(output.friends[0]).toBe('Vision')
	expect(output.friends[1]).toBe('Bruce')

	// And when

	input.friends[0] = 'Peter'

	// Then

	expect(output.friends[0]).toBe('Vision')

})

test('deepCopy copies array of object values', async () => {

	// Given
	
	const input = {
		name: 'Tony',
		friends: [
			{
				name: 'Vision',
			},
			{
				name: 'Bruce',
			}
		]
	}

	// When

	const output = deepCopy(input)

	// Then

	expect(output.friends.length).toBe(2)
	expect(output.friends[0].name).toBe('Vision')
	expect(output.friends[1].name).toBe('Bruce')

	// And when

	input.friends[0].name = 'Peter'

	// Then

	expect(output.friends[0].name).toBe('Vision')

})

test('deepCopy copies function values', async () => {

	// Given
	
	const input = {
		name: 'Tony',
		doSomething: (value: number): number => {
			return value * 2
		}
	}

	// When

	const output = deepCopy(input)

	// Then

	expect(output.name).toBe('Tony')
	expect(typeof output.doSomething).toBe('function')

	// And when

	const fn = output.doSomething
	const fnOutput = fn(2)

	// Then

	expect(fnOutput).toBe(4)

})
