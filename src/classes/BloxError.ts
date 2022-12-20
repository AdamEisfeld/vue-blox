/**
 * This is a convenience extension of the Error class, used internally by Vue Blox when throwing errors. You can
 * inspect the user-friendly message, the more detailed debugMessage, or the optional context object for more information
 * when a failure occurs.
 * 
 * A convenience function for determining if an error is a BloxError is provided via the static asBloxError(...) function.
 */
export class BloxError extends Error {

	isBloxError: boolean
	message: string
	debugMessage: string
	context: any

	constructor(message: string, debugMessage: string, context: any) {
		super(`${debugMessage}: ${JSON.stringify(context)}`)
		this.message = message
		this.debugMessage = debugMessage
		this.context = context
		this.isBloxError = true
	}

	static asBloxError(error: any): BloxError | undefined {
		return error.isBloxError ? error as BloxError : undefined
	}

}
