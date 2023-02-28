export function deepCopy(source: any): any {

	if (typeof source !== 'object') {
		return JSON.parse(JSON.stringify(source))
	}

	const result: any = {}

	const keys = Object.keys(source)
	for (let k = 0; k < keys.length; k += 1) {
		
		const key = keys[k]
		const value = source[key]

		if (typeof value === 'object' && Array.isArray(value)) {

			const mutableCopies: any[] = []

			for (let i = 0; i < value.length; i += 1) {

				const nestedObject = value[i]
				const nestedCopy = deepCopy(nestedObject)
				mutableCopies.push(nestedCopy)

			}

			result[key] = mutableCopies

		} else if (typeof value === 'object') {

			const nestedCopy = deepCopy(value)
			result[key] = nestedCopy

		} else if (typeof value === 'function') {

			result[key] = value

		} else {

			result[key] = deepCopy(value)

		}

	}

	return result

}