import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
	// If our .vue files have a style, it will be compiled as a single `.css` file under /dist.
	plugins: [
		Vue()
	],
	root: './demo',
	build: {
		// Output compiled files to /dist.
		outDir: './dist',
		// rollupOptions: {
		// 	// Vue is provided by the parent project, don't compile Vue source-code inside our library.
		// 	external: ['vue'],
		// 	output: { globals: { vue: 'Vue' } },
		// },
	},
})