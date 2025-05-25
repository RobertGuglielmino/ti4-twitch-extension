/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/video_index.html",
    "./src/config.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'avalors': ['AvalorsPersonalUseOnly', 'sans-serif'],
        'astro': ['ndastroneer', 'sans-serif'],
      },
      colors: {
        tiwhite: 'rgb(255, 255, 255)',
        tiblue: 'rgb(1, 169, 203)',
        tipurple: 'rgb(190, 70, 229)',
        tired: 'rgb(178, 59, 77)',
        tiyellow: 'rgb(19, 170, 28)',
        tigreen: 'rgb(1, 121, 55)',
      },
    },

  },
  plugins: [
    require('tailwindcss-text-fill-stroke'), // no options to configure
  ],
}