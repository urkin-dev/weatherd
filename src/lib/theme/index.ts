// TODO: Refactor this
export const theme = {
	container: {
		tablet: 768,
		desktop: 1200,
		mobile: 500
	},
	breakpoints: {
		mobile: 0,
		tablet: 768,
		desktop: 1200
	},
	padding: {},
	media: {
		tablet: `@media (min-width: 768px)`,
		onlyTablet: `@media (min-width: 768px) and (max-width: 1200px)`,
		mobile: `@media (max-width: 767px)`,
		desktop: `@media (min-width: 1200px)`
	},
	color: {
		black: '#020202',
		white: '#ffffff',
		maingray: '#F6F6F8',
		lightgray: '#aaa',
		yellow: '#FDDB4B',
		blue: '#404FD1'
	},
	font: {
		size: {
			main: 16,
			medium: 20,
			large: 24,
			small: 14,
			extrasmall: 12,
			huge: 36
		}
	}
}
