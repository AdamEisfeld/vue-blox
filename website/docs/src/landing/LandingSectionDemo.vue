<script lang="ts">
import { defineComponent, Ref, ref, watch, computed, ComponentPublicInstance } from 'vue'
import { BloxComponent } from '../../../node_modules/vue-blox'
import { getPluginMustache } from '../../../node_modules/vue-blox-mustache'
import { getPluginCompute, getPluginEvent } from '../../../node_modules/vue-blox-expressions'
import { Parser } from 'expr-eval'
import LayoutSection from '../layouts/LayoutSection.vue'
import Button from '../components/Button.vue'
import InputTextview from '../components/InputTextview.vue'
import Href from '../components/Href.vue'

export default defineComponent({
	name: 'LandingSectionDemo',
	components: {
		LayoutSection,
		Button,
		InputTextview,
		Href,
		BloxComponent,
	},
	props: {
		title: {
			type: String,
			required: true,
			default: 'Demo',
		},
		caption: {
			type: String,
			required: true,
			default: 'Enter some JSON to see live updates.',
		},
		isInverted: {
			type: Boolean,
			required: false,
			default: false,
		},
		isVariablesEnabled: {
			type: Boolean,
			required: false,
			default: true,
		},
		startingVariables: {
			type: Object as () => Record<string, any>,
			required: false,
			default: undefined,
		},
		startingModels: {
			type: Object as () => any[],
			required: false,
			default: undefined,
		},
		selectableComponents: {
			type: Object as () => { name: string, model: any }[],
			required: true,
		},
		catalog: {
			type: Object as () => Record<string, ComponentPublicInstance<any>>,
			required: true,
		}
	},
	emits: [],
	setup(props) {

		const inputBindings: Ref<any> = ref(props.startingVariables)
		const inputBindingsJson: Ref<string | undefined> = ref(inputBindings.value ? JSON.stringify(inputBindings.value, null, '\t') : undefined)

		watch(inputBindingsJson, () => {
			rebuildLivePreview()
		})

		const inputViews: Ref<any[]> = ref(props.startingModels ?? [])
		const inputViewsJson: Ref<string | undefined> = ref(inputViews.value && inputViews.value.length > 0 ? JSON.stringify(inputViews.value, null, '\t') : undefined)
		
		const startingVariableJson = inputBindingsJson.value
		const startingViewsJson = inputViewsJson.value

		watch(inputViewsJson, () => {
			rebuildLivePreview()
		})

		watch(inputBindings, () => {
			rebuildJSON()
		}, {
			deep: true
		})

		const rebuildLivePreview = () => {

			try {
				inputBindings.value = JSON.parse(inputBindingsJson.value ?? '')
			} catch(error) {
				// ignore
			}

			try {
				const parsed = JSON.parse(inputViewsJson.value ?? '')
				if (Array.isArray(parsed)) {
					inputViews.value = parsed
				} else {
					inputViews.value = [parsed]
				}
			} catch(error) {
				// ignore
			}
		}

		const rebuildJSON = () => {
			inputBindingsJson.value = Object.keys(inputBindings.value).length > 0 ? JSON.stringify(inputBindings.value, null, '\t') : undefined
		}

		const addComponent = (component: { name: string, model: any }) => {
			try {
				let currentInput = inputViews.value
				if (Array.isArray(currentInput)) {
					currentInput.push(component.model)
				} else {
					currentInput = [currentInput, component.model]
				}
				const stringified = JSON.stringify(currentInput, null, '\t')
				inputViewsJson.value = stringified
			} catch(error) {
				// ignore
			}
		}

		const focusing: Ref<Record<string, boolean>> = ref({
			'variables': false,
			'model': false
		})
		
		const onFocusVariables = () => {
			focusing.value['variables'] = true
		}

		const onBlurVariables = () => {
			focusing.value['variables'] = false
		}

		const onFocusModel = () => {
			focusing.value['model'] = true
		}

		const onBlurModel = () => {
			focusing.value['model'] = false
		}

		const isEditing = computed(() => {
			return Object.values(focusing.value).includes(true)
		})

		const hasChangedVariables = computed(() => {
			try {
				const isVariablesChanged = props.isVariablesEnabled && inputBindingsJson.value !== startingVariableJson
				return isVariablesChanged
			} catch(error) {
				// ignore
				return true
			}
		})

		const hasChangedModel = computed(() => {
			try {
				const isModelsChanged =  inputViewsJson.value !== startingViewsJson
				return isModelsChanged
			} catch(error) {
				// ignore
				return true
			}
		})

		const onResetVariables = () => {
			inputBindingsJson.value = props.startingVariables ? JSON.stringify(props.startingVariables, null, '\t') : undefined
		}

		const onResetModel = () => {
			inputViewsJson.value = props.startingModels ? JSON.stringify(props.startingModels, null, '\t') : undefined
		}
	
		const parser = new Parser()
		parser.functions.console = (message: any) => {
			console.log(message)
		}

		const plugins = [
			getPluginMustache(),
			getPluginCompute({
				parser: new Parser()
			}),
			getPluginEvent({
				parser: parser
			})
		]

		const handleError = (error: Error) => {
			console.log(error)
		}

		rebuildLivePreview()

		return {
			inputViews,
			inputBindings,
			inputBindingsJson,
			inputViewsJson,
			addComponent,
			onFocusVariables,
			onBlurVariables,
			onFocusModel,
			onBlurModel,
			isEditing,
			onResetModel,
			onResetVariables,
			hasChangedModel,
			hasChangedVariables,
			plugins,
			handleError,
		}
	},
})

</script>

<template>
	<LayoutSection>
		<!-- Title / Caption -->
		<div class="flex flex-col gap-2">
			<span class="text-2xl md:text-4xl font-bold" :class="isInverted ? 'text-gray-50' : 'text-gray-900'">{{ title }}</span>
			<span class="text-semibold" :class="isInverted ? 'text-gray-50' : 'text-gray-900'" v-html="caption"></span>
		</div>

		<!-- Content -->
		<div class="flex flex-col lg:flex-row gap-8">

			<!-- Editor -->
			<div class="flex flex-col gap-8 w-full">

				<!-- JSON Entry -->
				<div class="flex flex-col grow lg:flex-row gap-8 h-full">

					<!-- Textview Variables -->
					<div v-if="isVariablesEnabled" class="flex flex-col gap-4 w-full h-full">
						<InputTextview class="w-full min-h-64 max-h-96 lg:min-h-min lg:max-h-full lg:h-full" :minimumHeight="12" :maximumHeight="48" :isAutosizeEnabled="false" :isSpellCheckEnabled="false" :isWrapEnabled="false" placeholder="Enter some JSON" v-model:text="inputBindingsJson" @on:focus="onFocusVariables!()" @on:blur="onBlurVariables!()"/>
						<div class="flex flex-row gap-4 items-center">
							<!-- Tool Tip-->
							<span class="flex flex-row gap-2 items-center text-xs text-right" :class="isInverted ? 'text-gray-50' : ''"><FontAwesomeIcon icon="fa-solid fa-circle-info" title="You can enter any valid singular JSON object here (no arrays). Reference the keys in your views' props via the bind: prefix."/> Variables</span>
							<!-- Spacer -->
							<div class="flex grow"></div>
							<!-- Reset Button-->
							<Href v-if="hasChangedVariables" :isEnabled="hasChangedVariables" class="text-xs text-right w-min" :class="isInverted ? 'text-white' : 'text-red-500'" @click="onResetVariables!()"><FontAwesomeIcon icon="fa-solid fa-arrows-rotate"/> Reset</Href>
						</div>
					</div>

					<!-- Textview Model -->
					<div class="flex flex-col gap-4 w-full h-full">
						<InputTextview class="w-full min-h-64 max-h-96 lg:min-h-min lg:max-h-full lg:h-full" :minimumHeight="12" :maximumHeight="48" :isAutosizeEnabled="false" :isSpellCheckEnabled="false" :isWrapEnabled="false" placeholder="Enter some JSON" v-model:text="inputViewsJson" @on:focus="onFocusModel!()" @on:blur="onBlurModel!()"/>
						<!-- Reset Button-->
						<div class="flex flex-row gap-4 items-center">
							<!-- Tool Tip-->
							<span class="flex flex-row gap-2 items-center text-xs text-right" :class="isInverted ? 'text-gray-50' : ''"><FontAwesomeIcon icon="fa-solid fa-circle-info" title="Describe one or more JSON objects here that provide a 'type' key, with a value mapped to one of the supported components in this demo, eg 'type': 'label'."/> Views</span>
							<!-- Spacer -->
							<div class="flex grow"></div>
							<!-- Reset Button-->
							<Href v-if="hasChangedModel" :isEnabled="hasChangedModel" class="text-xs text-right w-min" :class="isInverted ? 'text-white' : 'text-red-500'" @click="onResetModel!()"><FontAwesomeIcon icon="fa-solid fa-arrows-rotate"/> Reset</Href>
						</div>
					</div>

				</div>

			</div>

			<!-- Shuffle Icon -->
			<div class="flex flex-row items-center min-h-full" :class="isEditing ? 'animate-pulse' : ''">
				<FontAwesomeIcon icon="fa-solid fa-shuffle" class="text-2xl m-auto rotate-90 lg:rotate-0" :class="isInverted ? 'text-gray-50' : 'text-brand'"/>
			</div>

			<!-- Live Results -->
			<div class="flex flex-col gap-4 w-full h-min">

				<!-- Live Demo Window -->
				<div class="flex flex-col w-full h-min bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-100 ease-in-out " :class="isEditing ? 'transform scale-3dlg shadow-lg' : 'shadow'">
					
					<!-- Window Bar -->
					<div class="flex flex-row gap-2 p-3 items-center w-full bg-gray-100 border-b border-gray-200">
						<div class="rounded-full bg-red-400 w-2 h-2"></div>
						<div class="rounded-full bg-yellow-400 w-2 h-2"></div>
						<div class="rounded-full bg-green-400 w-2 h-2"></div>
						<div class="flex flex-grow"></div>
						<span class="text-xs">Live Demo</span>
					</div>

					<!-- Body -->
					<div class="flex flex-col gap-4 p-8 h-min overflow-scroll select-none min-h-64 max-h-96">
						<template v-for="view in inputViews">
							<BloxComponent :view="view" :variables="inputBindings" :catalog="catalog" class="w-full h-auto" :plugins="plugins" @on:error="error => handleError(error)"/> 
						</template>
					</div>

				</div>

				<div class="flex flex-row gap-4 items-center">
					<!-- Tool Tip-->
					<span class="flex flex-row gap-2 items-center text-xs text-right" :class="isInverted ? 'text-gray-50' : ''"><FontAwesomeIcon icon="fa-solid fa-circle-info" title="See the results of your JSON changes in real-time."/> Preview</span>
					<!-- Spacer -->
					<div class="flex grow"></div>
					<!-- Reset Button-->
					<Href v-if="hasChangedVariables || hasChangedModel" :isEnabled="hasChangedVariables || hasChangedModel" class="text-xs text-right w-min" :class="isInverted ? 'text-white' : 'text-red-500'" @click="() => { onResetVariables!(); onResetModel!() }"><FontAwesomeIcon icon="fa-solid fa-arrows-rotate"/> Reset</Href>
				</div>

			</div>

		</div>

		<!-- Component Menu -->
		<div class="flex flex-row gap-4 p-4 overflow-scroll rounded-xl h-auto" :class="isInverted ? 'bg-black/10 ' : 'border'">
			<template v-for="component in selectableComponents">
				<Button :isFilled="false" :isSmall="true" :isInverted="isInverted" @click="addComponent!(component)">
					<FontAwesomeIcon icon="fa-solid fa-plus"/>
					<span>{{ component.name }}</span>
				</Button>
			</template>
		</div>
	</LayoutSection>
</template>
