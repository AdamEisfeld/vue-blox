/**
 * This is a convenience extension of the Error class, used internally by Vue Blox when throwing errors. You can
 * inspect the user-friendly message, the more detailed debugMessage, or the optional context object for more information
 * when a failure occurs.
 */
export class BloxError extends Error {

	message: string
	debugMessage: string
	context: any

	constructor(message: string, debugMessage: string, context: any) {
		super(`${debugMessage}: ${JSON.stringify(context)}`)
		this.message = message
		this.debugMessage = debugMessage
		this.context = context
	}

}
