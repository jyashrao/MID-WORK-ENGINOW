/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#142535',
        navy: '#203751',
        'text-main': '#142535',
        'text-muted': '#475569',
        'accent-blue': '#685cb2',
      },
      boxShadow: {
        'soft': '0px 10px 40px rgba(0, 0, 0, 0.08)',
        'glow': '0px 10px 30px rgba(104, 92, 178, 0.2)',
      }
    },
  },
  plugins: [],
}