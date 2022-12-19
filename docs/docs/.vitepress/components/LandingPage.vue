<script lang="ts">
import { defineComponent, ref, Ref, ComponentPublicInstance } from 'vue'

import NavigationBar from '../../src/components/NavigationBar.vue'
import FooterBar from '../../src/components/FooterBar.vue'
import LandingSectionAboveFold from '../../src/landing/LandingSectionAboveFold.vue'
import LandingSectionDemoTryItOut from '../../src/landing/LandingSectionDemoTryItOut.vue'
import LandingSectionDemoBindVariables from '../../src/landing/LandingSectionDemoBindVariables.vue'
import LandingSectionDemoNestedSlots from '../../src/landing/LandingSectionDemoNestedSlots.vue'
import LandingSectionDemoMustache from '../../src/landing/LandingSectionDemoMustache.vue'

import DemoLabelComponent from '../../src/demo/DemoLabelComponent.vue'
import DemoInputTextboxComponent from '../../src/demo/DemoInputTextboxComponent.vue'
import DemoStepperComponent from '../../src/demo/DemoStepperComponent.vue'
import DemoGridComponent from '../../src/demo/DemoGridComponent.vue'
import DemoProfileImageComponent from '../../src/demo/DemoProfileImageComponent.vue'
import DemoHeadingComponent from '../../src/demo/DemoHeadingComponent.vue'
import DemoCellComponent from '../../src/demo/DemoCellComponent.vue'
import DemoImageComponent from '../../src/demo/DemoImageComponent.vue'
import { getBloxCatalog } from 'vue-blox'

export default defineComponent({
	name: 'LandingPage',
	components: {
		NavigationBar,
		FooterBar,
		LandingSectionAboveFold,
		LandingSectionDemoTryItOut,
		LandingSectionDemoBindVariables,
		LandingSectionDemoNestedSlots,
		LandingSectionDemoMustache,
	},
	props: undefined,
	setup() {

		const refBelowFold: Ref<ComponentPublicInstance<any> | undefined> = ref(undefined)

		const catalog = getBloxCatalog({
			'label': DemoLabelComponent,
			'textbox': DemoInputTextboxComponent,
			'stepper': DemoStepperComponent,
			'grid': DemoGridComponent,
			'profile': DemoProfileImageComponent,
			'heading': DemoHeadingComponent,
			'cell': DemoCellComponent,
			'image': DemoImageComponent,
		})

		return {
			refBelowFold,
			catalog
		}
	},
})
</script>

<template>
	<main id="main" class="w-screen h-screen overflow-scroll text-gray-500 bg-gray-50 text-base scroll-smooth font-normal">
		<NavigationBar/>
		<LandingSectionAboveFold :aboveFoldTarget="refBelowFold"/>
		<LandingSectionDemoTryItOut :catalog="catalog" id="scrollTarget"/>
		<LandingSectionDemoBindVariables :catalog="catalog"/>
		<LandingSectionDemoNestedSlots :catalog="catalog"/>
		<LandingSectionDemoMustache :catalog="catalog"/>
		<FooterBar/>
	</main>
</template>
