<script lang="ts">
import { defineComponent, ComponentPublicInstance, onMounted } from 'vue'
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

		const getNavbarHeight = () => {
			const navbar = document.getElementById('navbar')

			if (!navbar) {
				return 0
			}

			return navbar.scrollHeight
		}

		const onViewDemo = () => {
			const main = document.getElementById('main')
			const element = document.getElementById('scrollTarget')

			if (!main || !element) {
				return
			}

			const scrollTo = element.offsetTop

			main?.scrollTo({
				top: scrollTo - getNavbarHeight(),
				left: 0,
				behavior: 'smooth'
			})
		}

		const onGetStarted = () => {
			window.location.href = '/docs/getting-started'
		}

		const onGitHub = () => {
			window.open('https://github.com/AdamEisfeld/vue-blox', '_blank')
		}

		onMounted(() => {
			const aboveFoldElement = document.getElementById('aboveFold')
			if (!aboveFoldElement) {
				return
			}
			aboveFoldElement.style.paddingTop = `${getNavbarHeight()}px`
		})

		return {
			onGetStarted,
			onViewDemo,
			onGitHub
		}
	},
})

</script>

<template>
	<LayoutSection :isFullScreen="true" id="aboveFold">
		<div class="flex flex-col flex-grow gap-8">
			<div class="flex flex-col gap-4 items-center max-w-sm sm:max-w-lg m-auto z-30">
				<div class="flex flex-row sm:flex-col gap-4 m-auto items-center w-max">
					<IconLogo class="w-16 sm:w-32"/>
					<span class="text-4xl xl:text-6xl font-bold text-center text-gray-900">Vue Blox.</span>
				</div>
				<span class="text-center text-sm sm:text-base">A light-weight framework for rendering vanilla JS objects mapped to Vue Templates, with 2-way prop binding, slots, and mustache support.</span>
				<div class="flex flex-row w-auto gap-4 m-auto pt-24">
					<Button @click="onGetStarted()">
						<div class="flex flex-row m-auto gap-4 items-center">
							<span>Get Started</span>
						</div>
					</Button>
					<Button :isFilled="false" @click="onGitHub()">
						<div class="flex flex-row m-auto gap-4 items-center">
							<FontAwesomeIcon icon="fa-brands fa-github" />
							<span>Github</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
		<button @click="onViewDemo()" class="flex flex-col gap-4 items-center m-auto">
			<div class="flex flex-col items-center gap-4 bg-brand m-auto w-max p-4 text-white rounded-lg aspect-square animate-bounce">
				<FontAwesomeIcon icon="fa-solid fa-arrow-down m-auto"/>
			</div>
			<span class="text-brand font-semibold text-sm">View Demo</span>
		</button>
	</LayoutSection>
</template>
