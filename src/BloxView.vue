<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Ref } from 'vue'
import { BloxCatalog } from './BloxCatalog'
import { BloxModel } from './BloxModel'

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
			const useProps = props.model.props
			const values: Record<string, any> = {}
			const keys = Object.keys(useProps)
			for (let k = 0; k < keys.length; k += 1) {
				const key = keys[k]
				const value = useProps[key]?.value ?? useProps[key]
				values[key] = value
			}
			return values
		})

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
