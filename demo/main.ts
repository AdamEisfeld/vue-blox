import { createApp } from 'vue'
import { createBlox } from '../src'
import StackComponent from './StackComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

import App from './App.vue'

const app = createApp(App)

const blox = createBlox({
	'stack': StackComponent,
	'button': ButtonComponent
})

app.use(blox)

app.mount('#app')
