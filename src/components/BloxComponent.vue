<script lang="ts">
import { defineComponent, computed } from 'vue'
import { BloxBindings } from '../classes/BloxBindings'
import { BloxView } from '../classes/BloxView'
import { BloxGlobal } from '../classes/BloxGlobal'
import { BloxValuePluginMustache } from '../classes/BloxValuePluginMustache'
import type { BloxCatalog } from '../classes/BloxCatalog'
import type { BloxValuePluginInterface } from '../interfaces/BloxValuePluginInterface'

/**
 * A dynamic Vue component that renders an external Vue component based on the 'type' field on the view object provided in
 * the component's props, and the component found for this type (if any) from the catalog object provided in the component's
 * props.
 * 
 * - catalog: The catalog to use when determining which component to inject. If no catalog is provided, the global catalog
 * configured via registerBlox(...) will be used.
 * - view: The view data to inject into the Vue component
 * - bindings: Any reactive variables that the view's props will be getting data from / sending data to
 * - valuePlugins: An optional array of value plugins to use on every prop value for the view before passing those prop values
 * into the view's component. If no key plugins are specified, then the global key plugins configured via registerBlox(...)
 * will be used, if any.
 * 
 */
export default defineComponent({
	name: 'BloxComponent',
	components: undefined,
	props: {
		catalog: {
			type: Object as () => BloxCatalog,
			required: false,
			default: BloxGlobal.shared.catalog,
		},
		view: {
			type: Object as () => BloxView,
			required: false,
			default: new BloxView(),
		},
		bindings: {
			type: Object as () => BloxBindings,
			required: false,
			default: new BloxBindings(),
		},
		valuePlugins: {
			type: Object as () => BloxValuePluginInterface[],
			required: false,
			default: []
		}
	},
	setup(props) {

		const getPlugins = computed(() => {
			const usePlugins: BloxValuePluginInterface[] = props.valuePlugins
			if (usePlugins.length === 0) {
				usePlugins.push(...BloxGlobal.shared.valuePlugins)
			}
			usePlugins.push(new BloxValuePluginMustache())
			return usePlugins
		})

		const getProps = computed(() => {

			const { view, bindings } = props
			const plugins = getPlugins.value

			// "Flatten" our variables, remove reactivity so we just have a simple dictionary
			const flattenedVariables: Record<string, any> = {}
			const variableNames = Object.keys(bindings.entries)
			for (let v = 0; v < variableNames.length; v += 1) {
				const key = variableNames[v]
				const value = bindings.entries[key]?.value ?? bindings.entries[key] // Fallback to accessing raw value, in the event Vue has removed reactivity from our variables when providing to our component. This seems to only happen in unit tests.
				flattenedVariables[key] = value
			}

			const propNames = Object.keys(view.props)

			const results: Record<string, any> = {}

			for (let p = 0; p < propNames.length; p += 1) {
				const propName = propNames[p]
				const propValue = view.props[propName]
				const propValueUnwrapped = propValue?.value ?? propValue

				let mutablePropValue = propValueUnwrapped
				
				for (let r = 0; r < plugins.length; r += 1) {
					const plugin = plugins[r]
					mutablePropValue = plugin.handleValue(mutablePropValue, flattenedVariables)
				}

				results[propName] = mutablePropValue

			}

			return results

		})

		return {
			getProps,
		}
	},
})

</script>
	
<template>
	<component v-if="view" :is="catalog.getComponentForType(view.type)" v-bind="{...getProps}">
		<template v-for="slotName in Object.keys(view.slots)" :key="slotName" v-slot:[slotName]>
			<template v-for="slotModel in view.slots[slotName]">
				<BloxComponent :catalog="catalog" :view="slotModel" :bindings="bindings" :valuePlugins="valuePlugins"/>
			</template>
		</template>
	</component>
</template>
