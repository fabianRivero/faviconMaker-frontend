/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minimal: {
          bg: '#ffffff',
          primary: '#f8f9fa',
          secondary: '#e9ecef',
          accent: '#6c757d',
          text: '#212529',
        }
      }
    }
  },
  plugins: [],
}