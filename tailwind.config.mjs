/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#FFBB1D',
					100: '#F5EAD2',
        	200: '#EAD4A5',
        	300: '#DFC078',
        	400: '#D3AA66',
        	500: '#BD9D55',
        	600: '#9F8344',
        	700: '#826A36',
        	800: '#665227',
        	900: '#493916',
				},
				brandlight: '#FDF6E7',
			}
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '2rem',
			}
		},
		fontFamily: {
			title: ['Crimson Pro', 'serif'],
			body: ['Montserrat', 'sans-serif'],

		}
	},
	plugins: [],
}
