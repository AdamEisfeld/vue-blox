import './styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faMinus, faCircleInfo, faArrowsRotate, faShuffle } from '@fortawesome/free-solid-svg-icons';
import DefaultTheme from 'vitepress/theme'
import ClientContainer from '../components/ClientContainer.vue'

export default {
	...DefaultTheme,
	enhanceApp({ app, router, siteData }) {
		library.add([
			faGithub,
			faPlus,
			faMinus,
			faCircleInfo,
			faArrowsRotate,
			faShuffle 
		])
		app.component('FontAwesomeIcon', FontAwesomeIcon)
		app.component('ClientContainer', ClientContainer)
		
	},
}