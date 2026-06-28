/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // Next.js 13 app dir
    "./pages/**/*.{js,ts,jsx,tsx}", // caso use pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'ui-sans-serif', 'system-ui'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};
