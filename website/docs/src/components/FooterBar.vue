<script lang="ts">
import { defineComponent} from 'vue'
import IconLogo from '../icons/IconLogo.vue'

export default defineComponent({
	name: 'FooterBar',
	components: {
		IconLogo
	},
	props: undefined,
	emits: [],
	setup() {
		return {}
	},
})

</script>

<template>
	<div class="w-full flex flex-row">
		<div class="flex flex-row gap-8 p-8 w-full md:container md:m-auto items-center">
			<span class="text-center text-sm w-full">MIT Licensed | Copyright © 2022-present Adam Eisfeld</span>
		</div>
	</div>
</template>
