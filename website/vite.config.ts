import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		commonjsOptions: {
			include: ['tailwind-config.cjs', 'node_modules/**'],
		},
	},
	optimizeDeps: {
		include: ['tailwind-config'],
	},
	resolve:{
		alias:{
			'@components': path.resolve(__dirname, './src/components'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@sandbox': path.resolve(__dirname, './src/sandbox'),
			'@icons': path.resolve(__dirname, './src/icons'),
			'@landing': path.resolve(__dirname, './src/landing'),
		}
	},
})
