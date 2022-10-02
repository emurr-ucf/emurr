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
      'green': {
        200:'#8c9385',
        300:'#808a75',
        400:'#737e67',
        500:'#66725a',
        600:'#5a664d',
        700:'#4d5940',
        800:'#404b34',
        900:'#333d29',
      }, 
      'background': {
        200: '#FAFAFA',
        300: '#F6F2EE',
        400: '#EEE5DD',
        500: '#E6D7CA',
        600: '#dfcab9',
        700: '#d8bda6',
        800: '#d2b093',
        900: '#cca37f',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  darkMode: ['class', '[data-mode="dark"]'],
  } 
}