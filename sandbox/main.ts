// import { createApp } from 'vue'

// import App from './App.vue'

// const app = createApp(App)

// app.mount('#app')


import { createApp } from 'vue'
import { registerBlox } from '../src'

import App from './App.vue'

const app = createApp(App)

const blox = registerBlox()

app.use(blox)

app.mount('#app')