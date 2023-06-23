<script lang="ts">

import { defineComponent, reactive } from 'vue'
import { BloxComponent } from '../src'
import StackComponent from './components/StackComponent.vue'
import LabelComponent from './components/LabelComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import IncrementComponent from './components/IncrementComponent.vue'

export default defineComponent({
	name: 'App',
	components: {
		BloxComponent,
	},
	props: {},
	setup() {

		const variables: any = reactive({
			name: 'Adam',
			foo: 1,
			profile: {
				age: 30,
				occupation: 'Software Engineer',
			},
			friends: [
				{
					name: 'Bob',
					age: 31,
				},
				{
					name: 'Charlie',
					age: 32,
				},
				{
					name: 'Dave',
					age: 33,
				}
			]
		})

		// 1. Catalog

		const catalog = {
			'stack': StackComponent,
			'label': LabelComponent,
			'button': ButtonComponent,
			'increment': IncrementComponent,
		}

		// 3. Construct view

		const view = reactive({
			type: 'stack',
			'slot:children': [
				{
					type: 'increment',
					'bind:value': 'friends.1.age',
				},
			],
			'for_each:friends': {
				'type': 'label',
				'text': 'Hello {{name}}',
			}
		})

		const plugins: any = [
		]

		return {
			catalog,
			variables,
			view,
			plugins,
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
