<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Ref } from 'vue'
import { BloxCatalog } from './BloxCatalog'
import { BloxModel } from './BloxModel'
var Mustache = require('mustache')

/**
 * A BloxView is a Vue component capable of rendering one or more plain JS objects that have been appropriately mapped to a BloxCatalog
 * provided to the view.
 */
export default defineComponent({
	name: 'BloxView',
	components: undefined,
	props: {
		catalog: {
			type: Object as () => BloxCatalog,
			required: false,
			default: BloxCatalog.shared,
		},
		model: {
			type: Object as () => BloxModel,
			required: false,
			default: new BloxModel(),
		},
		variables: {
			type: Object as () => Record<string, Ref<any>>,
			required: false,
			default: undefined,
		},
	},
	setup(props) {

		const computedProps = computed(() => {
			const flattenedVariables: Record<string, any> = {}
			for (let v = 0; v < Object.keys(props.variables ?? {}).length; v += 1) {
				const key = Object.keys(props.variables ?? {})[v]
				const value = (props.variables ?? {})[key]?.value ?? (props.variables ?? {})[key] // Fallback to accessing raw value, in the event Vue has removed reactivity from our variables when providing to our component. This seems to only happen in unit tests.
				flattenedVariables[key] = value
			}
			const useProps = props.model.props
			const values: Record<string, any> = {}
			const keys = Object.keys(useProps)
			for (let k = 0; k < keys.length; k += 1) {
				const key = keys[k]
				const value = unwrapMustacheIfFound(useProps[key]?.value ?? useProps[key], flattenedVariables)
				values[key] = value
			}
			return values
		})

		const unwrapMustacheIfFound = (value: any, flattenedVariables: Record<string, any>, steps: number = 0): any => {
			
			if (typeof value !== 'string' || !value.includes('{{')) {
				// This definitely isn't a mustache entry, exit early
				return value
			}

			try {
				let unwrapped = Mustache.render(value, flattenedVariables, flattenedVariables)
				if (unwrapped.includes('{{') && steps < 10) {
					unwrapped = unwrapMustacheIfFound(unwrapped, flattenedVariables, steps + 1)
				}
				return unwrapped ?? value
			} catch(error) {
				// ignore
				return value
			}

		}

		return {
			computedProps,
		}
	},
})

</script>
	
<template>
	<component v-if="model && model.view" :is="catalog?.getComponentForType(model.view.type)" v-bind="{...computedProps}">	
		<template v-for="slotName in Object.keys(model.slots)" :key="slotName" v-slot:[slotName]>
			<template v-for="slotModel in model.slots[slotName]">
				<BloxView :catalog="catalog" :model="slotModel" :variables="variables" />
			</template>
		</template>
	</component>
</template>
