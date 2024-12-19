/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // For Next.js 'app' directory
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js 'pages' directory
    './components/**/*.{js,ts,jsx,tsx}', // For shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
