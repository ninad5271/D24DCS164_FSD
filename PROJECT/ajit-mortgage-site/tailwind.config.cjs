module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ajit: {
          DEFAULT: '#0ea5e9',
          dark: '#0369a1'
        },
        surface: '#f8fafc'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.08)'
      }
    },
  },
  plugins: [],
}
