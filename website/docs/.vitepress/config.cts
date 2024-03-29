module.exports = {
	title: 'Vue Blox',
	description: 'Documentation for Vue Blox',
	head: [
		['link', { rel:'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }],
		['link', { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap', crossorigin: true }],
		['link', { rel: 'apple-touch-icon', sizes:'57x57', href:'/apple-icon-57x57.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'60x60', href:'/apple-icon-60x60.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'72x72', href:'/apple-icon-72x72.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'76x76', href:'/apple-icon-76x76.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'114x114', href:'/apple-icon-114x114.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'120x120', href:'/apple-icon-120x120.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'144x144', href:'/apple-icon-144x144.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'152x152', href:'/apple-icon-152x152.png' }],
		['link', { rel: 'apple-touch-icon', sizes:'180x180', href:'/apple-icon-180x180.png' }],
		['link', { rel: 'icon', type:'image/png', sizes:'192x192',  href:'/android-icon-192x192.png' }],
		['link', { rel: 'icon', type:'image/png', sizes:'32x32', href:'/favicon-32x32.png' }],
		['link', { rel: 'icon', type:'image/png', sizes:'96x96', href:'/favicon-96x96.png' }],
		['link', { rel: 'icon', type:'image/png', sizes:'16x16', href:'/favicon-16x16.png' }],
		['link', { rel: 'manifest', href:'/manifest.json' }],
		['meta', { name: "msapplication-TileColor", content: "#44C7A0" }],
		['meta', { name: "msapplication-config", content: "./browserconfig.xml" }],
		['meta', { name: "theme-color", content: "#44C7A0" }],
	],
	themeConfig: {
		logo: '/assets/brand/logo.svg',
		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'What Is Vue Blox?', link: '/docs/what-is-vue-blox' },
					{ text: 'Getting Started', link: '/docs/getting-started' },
				]
			},
			{
				text: 'Advanced',
				items: [
					{ text: 'Binding Props', link: '/docs/advanced/binding-props' },
					{ text: 'Functions As Props', link: '/docs/advanced/functions-as-props' },
					{ text: 'Watching Bindings', link: '/docs/advanced/watching-bindings' },
					{ text: 'Providing Slots', link: '/docs/advanced/providing-slots' },
					{ text: 'Component-Level Catalogs', link: '/docs/advanced/component-level-catalogs' },
					{ text: 'Error Handling', link: '/docs/advanced/error-handling' },
				]
			},
			{
				text: 'Plugins',
				items: [
					{ text: 'Overview', link: '/docs/plugins/plugins' },
					{ text: 'Mustache', link: '/docs/plugins/plugin-mustache' },
					{ text: 'Expressions', link: '/docs/plugins/plugin-expressions' },
				]
			},
			{
				text: 'API',
				items: [
					{
						text: 'Classes',
						items: [
							{ text: 'BloxContext', link: '/docs/api/classes/blox-context' },
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
						]
					},
					{
						text: 'Interfaces',
						items: [
							{ text: 'BloxPluginInterface', link: '/docs/api/interfaces/blox-plugin-interface' },
						]
					}
				]
			},
			{
				text: 'Resources',
				items: [
					{ text: 'Github', link: 'https://github.com/AdamEisfeld/vue-blox' },
					{ text: 'NPM', link: 'https://www.npmjs.com/package/vue-blox' },
				]
			},
		],
	},
}
