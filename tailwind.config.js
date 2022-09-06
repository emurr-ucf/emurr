/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'hard': '-0.2em 0.2em 0em #94A3B8',
      },
      transitionDelay: {
        '3000': '3000ms',
        '2000': '2000ms',
    },
    colors: {
      'brown': '#78685e',
      'green': '#5c665a',
      'background': {
        200: '#FAFAFA',
        500: '#F6F2EE',
        700: '#EEE5DD',
        900: '#E6D7CB'
      }
      // ...
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  } 
}