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
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  } 
}