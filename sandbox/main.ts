// import { createApp } from 'vue'

// import App from './App.vue'

// const app = createApp(App)

// app.mount('#app')


import { createApp } from 'vue'
import { BloxError, registerBlox } from '../src'

import StackComponent from './StackComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

import App from './App.vue'

const app = createApp(App)



const blox = registerBlox({
	catalog: {
		'stack': StackComponent,
		'button': ButtonComponent
	},
})

app.use(blox)

// app.config.errorHandler = (error: any) => {
// 	if (error.) {

// 	}
// 	console.log(error)
// }

app.mount('#app')