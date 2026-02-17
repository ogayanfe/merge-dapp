/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        "protocol-primary": "#6366f1",
        "protocol-secondary": "#8b5cf6",
        "protocol-accent": "#f43f5e",
        "protocol-success": "#10b981",
        "protocol-warning": "#f59e0b",
        "protocol-error": "#ef4444",
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "brand-glow": "0 0 20px rgba(99, 102, 241, 0.4)",
        "success-glow": "0 0 15px rgba(16, 185, 129, 0.4)",
        surface: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "grid-pattern": "url('/grid.svg')",
        "dots-pattern": "url('/dots.svg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#f43f5e",
          neutral: "#18181b",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        dark: {
          primary: "#6366f1",
          secondary: "#a78bfa",
          accent: "#fb7185",
          neutral: "#f8fafc",
          "base-100": "#09090b",
          "base-200": "#121214",
          "base-300": "#1e1e20",
          "base-content": "#f8fafc",
          info: "#60a5fa",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
  },
};
