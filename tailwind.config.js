/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				grow: 'grow .25s forwards',
				shrink: 'shrink .25s forwards',
			},
			keyframes: {
				grow: {
					from: {transform: 'scale(.9)'},
					to: {transform: 'scale(1)'}
				},
				shrink: {
					from: {transform: 'scale(1)'},
					to: {transform: 'scale(.9)'}
				}
			}
		},
	},
	plugins: [],
};
