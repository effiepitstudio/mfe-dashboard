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
        surface: "var(--color-surface)",
        "color-muted": "var(--color-muted)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
