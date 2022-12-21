<script lang="ts">
import { defineComponent} from 'vue'
import IconLogo from '../icons/IconLogo.vue'
import Href from './Href.vue'

export default defineComponent({
	name: 'NavigationBar',
	components: {
		IconLogo,
		Href
	},
	props: undefined,
	emits: [],
	setup() {

		const goTo = (link: string) => {
			window.location.href = link
		}

		return {
			goTo
		}
	},
})

</script>

<template>
	<div id="navbar" class="w-full flex absolute left-0 right-0 top-0 bg-gray-50/50 backdrop-blur-md z-50 shadow">
		<div class="flex flex-row gap-8 p-8 w-full md:container md:m-auto items-center">
			<div class="flex flex-row flex-none gap-4 items-center">
				<IconLogo class="w-6 sm:w-8"/>
				<span class="text-md sm:text-xl font-semibold text-gray-600">Vue Blox</span>
			</div>
			<div class="flex flex-grow"></div>
			<Href @click="goTo('/docs')" class="text-sm">
				<FontAwesomeIcon icon="fa-regular fa-file" class="text-brand"/>
				<span>Docs</span>
			</Href>
			<Href @click="goTo('/docs/api')" class="text-sm">
				<FontAwesomeIcon icon="fa-solid fa-code" class="text-brand"/>
				<span>API</span>
			</Href>
		</div>
	</div>
</template>
