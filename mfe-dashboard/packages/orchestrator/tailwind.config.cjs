module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../mfe-form/src/**/*.{ts,tsx,css}",
    "../mfe-visualizer/src/**/*.{vue,ts}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        secondary: "var(--secondary)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
