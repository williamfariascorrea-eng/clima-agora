/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 400: "#fbbf24", 500: "#d97706", 600: "#b45309" },
        surface: {
          50: "#faf6f2", 100: "#f0eae2", 200: "#d9d0c4", 300: "#b8ad9e",
          400: "#8a7f6f", 500: "#6b6050", 600: "#4a4035",
          700: "#2a2420", 800: "#1f1b18", 850: "#191513",
          900: "#110f0d", 950: "#0a0807",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
