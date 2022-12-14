import { BloxModel } from './BloxModel'
import type { Ref } from 'vue'

/**
 * A convenience function for extracting the relevant data needed by a BloxView component from one or more plain JS objects and an
 * optional map of variables.
 * @param inputModel A plain JS object that contains a 'type' key matching one of the types you have mapped to VueBlox.
 * @param inputVariables An optional plain JS object containing a map of variables that correspond to bound properties within your inputModel.
 */
export function useBlox(inputModel: any, inputVariables: any = undefined, existingVariables: Record<string, Ref<any>> | undefined = undefined): { processedView: any, model: BloxModel, variables: Record<string, Ref<any>> } {
	return BloxModel.from(inputModel, inputVariables, existingVariables)
}
