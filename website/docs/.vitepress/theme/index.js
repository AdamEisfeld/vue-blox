import './styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faMinus, faCircleInfo, faArrowsRotate, faShuffle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import DefaultTheme from 'vitepress/theme'
import LandingPage from '../components/LandingPage.vue'
import Parameter from '../components/Parameter.vue'
import MarkdownWithin from '../components/MarkdownWithin.vue'

const defaultTheme = DefaultTheme

export default {
	...defaultTheme,
	enhanceApp({ app, router, siteData }) {
		library.add([
			faGithub,
			faPlus,
			faMinus,
			faCircleInfo,
			faArrowsRotate,
			faShuffle,
			faArrowDown,
		])
		app.component('FontAwesomeIcon', FontAwesomeIcon)
		app.component('LandingPage', LandingPage)
		app.component('Parameter', Parameter)
		app.component('MarkdownWithin', MarkdownWithin)
	},
}
