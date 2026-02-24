/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17cf54',
        'primary-dark': '#12a543',
        'bg-light': '#f6f8f6',
        'bg-dark': '#112116',
      },
      fontFamily: {
        display: ['"Noto Serif"', '"Noto Sans Arabic"', 'serif'],
        body: ['"Noto Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
