module.exports = {
	title: 'Vue Blox',
	description: 'Documentation for Vue Blox',
	head: [
		['link', { rel:'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }],
		['link', { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap', crossorigin: true }],
	],
	themeConfig: {
		logo: '/logo.svg',
		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'What Is Vue Blox?', link: '/docs/what-is-vue-blox' },
					{ text: 'Getting Started', link: '/docs/getting-started' },
				]
			},
			{
				text: 'API',
				items: [
					{
						text: 'Classes',
						items: [
							{ text: 'BloxCatalog', link: '/docs/api/classes/blox-catalog' },
							{ text: 'BloxBindings', link: '/docs/api/classes/blox-bindings' },
							{ text: 'BloxView', link: '/docs/api/classes/blox-view' },
							{ text: 'BloxError', link: '/docs/api/classes/blox-error' },
						]
					},
					{
						text: 'Components',
						items: [
							{ text: 'BloxComponent', link: '/docs/api/components/blox-component' },
						]
					},
					{
						text: 'Composables',
						items: [
							{ text: 'registerBlox', link: '/docs/api/composables/register-blox' },
							{ text: 'getBloxCatalog', link: '/docs/api/composables/get-blox-catalog' },
							{ text: 'getBloxBindings', link: '/docs/api/composables/get-blox-bindings' },
							{ text: 'getBloxView', link: '/docs/api/composables/get-blox-view' },
						]
					},
					{
						text: 'Interfaces',
						items: [
							{ text: 'BloxKeyPluginInterface', link: '/docs/api/interfaces/blox-key-plugin-interface' },
							{ text: 'BloxValuePluginInterface', link: '/docs/api/interfaces/blox-value-plugin-interface' },
						]
					}
				]
			},
		],
	},
}
