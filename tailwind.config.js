/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "hsl(239 82% 66% / <alpha-value>)",
        "primary-hover": "hsl(239 92% 72% / <alpha-value>)",
        secondary: "hsl(220 15% 17% / <alpha-value>)",
        background: "hsl(220 14% 12% / <alpha-value>)",
        card: "hsl(220 15% 17% / <alpha-value>)",
        "text-primary": "hsl(210 40% 98% / <alpha-value>)",
        "text-secondary": "hsl(215 14% 65% / <alpha-value>)",
        border: "hsl(217 19% 27% / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        md: "0 6px 10px -2px rgba(0, 0, 0, 0.06), 0 3px 6px -3px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
