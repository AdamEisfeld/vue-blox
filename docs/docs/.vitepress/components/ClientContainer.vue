<script lang="ts">
export default {
	data() {
		return {
			dynamicComponent: null
		}
	},
	mounted () {
		import('./LandingPage.vue').then(module => {
			this.dynamicComponent = module.default
		})
	}
}
</script>

<template>
	<ClientOnly>
		<component v-if="dynamicComponent" :is="dynamicComponent"></component>
	</ClientOnly>
</template>
