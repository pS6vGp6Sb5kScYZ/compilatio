/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cela remplace la police "sans" par défaut de Tailwind par Poppins
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};