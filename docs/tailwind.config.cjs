/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: [
		"./index.html",
		"./index.ts",
		"./src/**/*.{js,ts,jsx,tsx,vue}",
		'./docs/**/*.{html,js,vue,ts,md}',
		'./docs/.vitepress/**/*.{html,js,vue,ts,md}',
	],
	theme: {
		extend: {
			colors: {
				'brand': '#44C7A0',
				'secondary': '#344A5E'
			},
			minHeight: (theme) => ({
				...theme('spacing'),
			}),
			scale: {
				'3d': '1.01',
				'3dlg': '1.05',
			},
			transitionProperty: {
				'width': 'width',
				'height': 'height',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				jump: {
					'0%': {
						transform: 'translateY(0%) rotate(0deg)',
						'animation-timing-function': 'cubic-bezier(0.33333, 0.66667, 0.66667, 1)'
					},
					'50%': {
						transform: 'translateY(-100%) rotate(180deg)',
						'animation-timing-function': 'cubic-bezier(0.33333, 0, 0.66667, 0.33333)'
					},
					'100%': {
						transform: 'translateY(0%) rotate(360deg)',
					}
				}
			},
			animation: {
				'spin-bounce': 'spin 3s linear infinite',
				'bounce-spin': 'bounce 1s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'orbit': 'spin 10s linear infinite',
				'jump': 'jump 1s linear infinite',
			},
		},
		fontFamily: {
			'sans': ['Heebo', 'sans-serif'] 
		},
	},
	plugins: [],
}
