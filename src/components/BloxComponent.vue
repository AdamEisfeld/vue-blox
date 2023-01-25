<script lang="ts">
import { defineComponent, computed, type ComponentPublicInstance } from 'vue'
import { BloxGlobal } from '../classes/BloxGlobal'
import { BloxPluginBind } from '../classes/BloxPluginBind'
import { BloxPluginSlot } from '../classes/BloxPluginSlot'
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'

/**
 * A dynamic Vue component that renders an external Vue component based on the 'type' field on the view object provided in
 * the component's props, and the component found for this type (if any) from the catalog object provided in the component's
 * props.
 * 
 * - catalog: The catalog to use when determining which component to inject. If no catalog is provided, the global catalog
 * configured via registerBlox(...) will be used.
 * - view: The view data to inject into the Vue component
 * - variables: Any variables that the view's props will be getting data from / sending data to. Can be reactive.
 * - plugins: An optional array of value plugins to use on every prop value for the view before passing those prop values
 * into the view's component. If no plugins are specified, then the global plugins configured via registerBlox(...)
 * will be used, if any.
 * 
 */
export default defineComponent({
	name: 'BloxComponent',
	components: undefined,
	props: {
		catalog: {
			type: Object as () => Record<string, ComponentPublicInstance<any>>,
			required: false,
			default: BloxGlobal.shared.catalog,
		},
		view: {
			type: Object as () => any,
			required: false,
			default: undefined,
		},
		variables: {
			type: Object as () => any,
			required: false,
			default: {},
		},
		plugins: {
			type: Object as () => BloxPluginInterface[],
			required: false,
			default: []
		},
	},
	emits: [
		'on:error'
	],
	setup(props, { emit }) {

		const getPlugins = computed(() => {
			try {
				const usePlugins: BloxPluginInterface[] = props.plugins
				if (usePlugins.length === 0) {
					usePlugins.push(...BloxGlobal.shared.plugins)
				}
				usePlugins.push(new BloxPluginBind())
				usePlugins.push(new BloxPluginSlot())
				return usePlugins
			} catch(error) {
				emit('on:error', error)
				return []
			}
		})

		const getView = computed((): { isSet: boolean, type: string | undefined, props: Record<string, any> | undefined, slots: Record<string, any[]> | undefined } => {

			try {

				const { view, variables } = props
			
				if (!view) {
					return {
						isSet: false,
						type: undefined,
						props: undefined,
						slots: undefined
					}
				}

				const { type } = view
				const plugins = getPlugins.value

				const viewKeys = Object.keys(view)

				const computedProps: Record<string, any> = {}
				Object.assign(computedProps, view)
				const computedSlots: Record<string, any[]> = {}

				const setProp = (propName: string, value: any) => {
					if (value) {
						computedProps[propName] = value
					} else {
						delete computedProps[propName]
					}
				}

				const setSlot = (slotName: string, views: any[]) => {
					computedSlots[slotName] = views
				}

				for (let k = 0; k < viewKeys.length; k += 1) {
					const key = viewKeys[k]
					let value = view[key]

					for (let p = 0; p < plugins.length; p += 1) {
						const plugin = plugins[p]
						plugin.run(key, value, variables, setProp, setSlot)
					}
				}

				return {
					isSet: true,
					type: type,
					props: computedProps,
					slots: computedSlots,
				}
			} catch(error) {
				emit('on:error', error)
				return {
					isSet: false,
					type: undefined,
					props: {},
					slots: {},
				}
			}

		})

		return {
			getView,
			emit,
		}
	},
})

</script>
	
<template>
	<component v-if="getView.isSet && getView.type" :is="catalog[getView.type]" v-bind="getView.props">
		<template v-for="slotName in Object.keys(getView.slots ?? {})" :key="slotName" v-slot:[slotName]>
			<template v-for="slotModel in (getView.slots ?? {})[slotName]">
				<BloxComponent :catalog="catalog" :view="slotModel" :variables="variables" :plugins="plugins" @on:error="(error: any) => emit('on:error', error)"/>
			</template>
		</template>
	</component>
</template>
