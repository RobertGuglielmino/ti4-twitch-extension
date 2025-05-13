/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'avalors': ['AvalorsPersonalUseOnly', 'sans-serif'],
        'astro': ['ndastroneer', 'sans-serif'],
      },
    },

  },
  plugins: [
    require('tailwindcss-text-fill-stroke'), // no options to configure
  ],
}