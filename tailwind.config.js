module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      'russo': ['Russo One', 'sans-serif'],
      'amc': ['amc', 'sans-serif'],
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
