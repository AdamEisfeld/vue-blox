<script lang="ts">

import { defineComponent, reactive } from 'vue'
import { BloxComponent } from '../src'
import StackComponent from './components/StackComponent.vue'
import LabelComponent from './components/LabelComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'

export default defineComponent({
	name: 'App',
	components: {
		BloxComponent,
	},
	props: {},
	setup() {

		// 1. Catalog

		const catalog = {
			'stack': StackComponent,
			'label': LabelComponent,
			'button': ButtonComponent,
		}
		
		// 2. Construct variables
		
		const variables = reactive({
			message: 'Hello, world!',
		})

		// 3. Construct view

		const view = reactive({
			type: 'stack',
			'slot:children': [
				{
					type: 'label',
					'bind:text': 'message',
				},
				{
					type: 'button',
					title: 'Click Me',
				},
			]
		})

		return {
			catalog,
			variables,
			view,
		}
	},
})
</script>

<template>
	<main style="padding: 48px; display: flex; flex-wrap: no-wrap; flex-direction: column; align-items: center; gap: 48px;">
		<img src="/logoVueBlox.png" width="200"/>
		<div style="padding: 24px; border-style: solid; border-color: gray; border-radius: 12px;">
			<BloxComponent :catalog="catalog" :view="view" :variables="variables" :plugins="plugins"/>
		</div>
	</main>
</template>
