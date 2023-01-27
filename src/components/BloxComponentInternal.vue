<script lang="ts">
import { defineComponent } from 'vue'
import type { BloxContext } from '../classes/BloxContext'

export default defineComponent({
	name: 'BloxComponentInternal',
	components: undefined,
	props: {
		context: {
			type: Object as () => BloxContext,
			required: false,
			default: undefined,
		},
	},
	setup() {
		return {}
	},
})

</script>
	
<template>
	<component v-if="context" :is="context.component" v-bind="context.props">
		<template v-for="slotName in Object.keys(context.slots)" :key="slotName" v-slot:[slotName]>
			<template v-for="slotContext in context.slots[slotName]">
				<BloxComponentInternal :context="slotContext"/>
			</template>
		</template>
	</component>
</template>
