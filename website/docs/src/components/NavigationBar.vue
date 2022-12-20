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

		const onDocs = () => {
			window.location.href = '/docs/what-is-vue-blox'
		}

		return {
			onDocs
		}
	},
})

</script>

<template>
	<div id="navbar" class="w-full flex absolute left-0 right-0 top-0 bg-gray-50/50 backdrop-blur-md z-50 shadow">
		<div class="flex flex-row gap-8 p-8 w-full md:container md:m-auto items-center">
			<div class="flex flex-row gap-4 items-center">
				<IconLogo class="w-8"/>
				<span class="text-xl font-semibold text-gray-600">Vue Blox</span>
			</div>
			<div class="flex flex-grow"></div>
			<Href @click="onDocs()">
				Docs
			</Href>
		</div>
	</div>
</template>
