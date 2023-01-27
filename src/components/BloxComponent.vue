<script lang="ts">
import type { BloxContext } from '../classes/BloxContext'
import { defineComponent, computed, type ComponentPublicInstance } from 'vue'
import { BloxGlobal } from '../classes/BloxGlobal'
import { BloxPluginBind } from '../classes/BloxPluginBind'
import { BloxPluginSlot } from '../classes/BloxPluginSlot'
import type { BloxPluginInterface } from '../interfaces/BloxPluginInterface'
import BloxComponentInternal from './BloxComponentInternal.vue'
import { buildRootContext } from '../composables/buildRootContext'

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
    name: "BloxComponent",
    components: {
		BloxComponentInternal
	},
    props: {
        catalog: {
            type: Object as () => Record<string, ComponentPublicInstance<any>>,
            required: false,
            default: undefined,
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
        "handleErrors"
    ],
    setup(props, { emit }) {

        /**
         * A computed value that obtains the plugins to use for our view
         */
        const getPlugins = computed(() => {
            const usePlugins: BloxPluginInterface[] = props.plugins
            if (usePlugins.length === 0) {
                usePlugins.push(...BloxGlobal.shared.plugins)
            }
            // Always append the stock bind / slot plugins
            usePlugins.push(new BloxPluginBind())
            usePlugins.push(new BloxPluginSlot())
            return usePlugins
        })

        /**
         * A computed value that obtains the catalog to use for our view
         */
        const getCatalog = computed(() => {
            return props.catalog ?? BloxGlobal.shared.catalog
        })

        /**
         * A computed value that obtains the props / slots to provide to our embedded component
         */
        const getContext = computed((): BloxContext | undefined => {

			const result = buildRootContext({
				view: props.view,
				variables: props.variables,
				catalog: getCatalog.value,
				plugins: getPlugins.value
			})

			if (result && result.errors && result.errors.length > 0) {
				emit('handleErrors', result.errors)
			}

			return result?.context

        })

        return {
            getContext,
            getCatalog,
            emit,
        }
    },
})

</script>
	
<template>
	<BloxComponentInternal :context="getContext"/>
</template>
