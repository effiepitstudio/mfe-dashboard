export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
