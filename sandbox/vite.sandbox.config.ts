import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		Vue()
	],
	root: './sandbox',
	build: {
		outDir: './dist',
	},
})
