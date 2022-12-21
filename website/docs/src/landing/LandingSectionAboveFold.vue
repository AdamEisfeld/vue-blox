<script lang="ts">
import { defineComponent, ComponentPublicInstance } from 'vue'
import LayoutSection from '../layouts/LayoutSection.vue'
import IconLogo from '../icons/IconLogo.vue'
import Button from '../components/Button.vue'

export default defineComponent({
	name: 'LandingSectionAboveFold',
	components: {
		LayoutSection,
		IconLogo,
		Button,
	},
	props: {
		aboveFoldTarget: {
			type: Object as () => ComponentPublicInstance<any>,
			required: false,
			default: undefined
		}
	},
	emits: [],
	setup(props) {

		const onGetStarted = () => {
			const main = document.getElementById('main')
			const navbar = document.getElementById('navbar')
			const element = document.getElementById('scrollTarget')

			if (!main || !navbar || !element) {
				return
			}

			const scrollTo = element.offsetTop
			const navHeight = navbar.scrollHeight

			main?.scrollTo({
				top: scrollTo - navHeight,
				left: 0,
				behavior: 'smooth'
			})
		}

		const onGitHub = () => {
			window.open('https://github.com/AdamEisfeld/vue-blox', '_blank')
		}

		return {
			onGetStarted,
			onGitHub
		}
	},
})

</script>

<template>
	<LayoutSection :isFullScreen="true">
		<div class="flex flex-col gap-4 items-center max-w-lg m-auto z-30">
			<IconLogo class="h-32"/>
			<span class="text-5xl xl:text-6xl font-bold text-center text-gray-900">Vue Blox.</span>
			<span class="text-center">A light-weight framework for rendering vanilla JS objects mapped to Vue Templates, with 2-way prop binding, slots, and mustache support.</span>
			<div class="flex flex-row gap-8 m-auto pt-24">
				<Button @click="onGetStarted()">
					<span>Demo</span>
				</Button>
				<Button :isFilled="false" @click="onGitHub()">
					<FontAwesomeIcon icon="fa-brands fa-github" />
					<span>Github</span>
				</Button>
			</div>
		</div>
	</LayoutSection>
</template>
