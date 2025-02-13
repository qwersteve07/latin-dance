import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "flow-bg": "#007690",
        "flow-text": "#ffffff",
        "copa-bg": "#8EC344",
        "copa-text": "#9C234F",
        "barcade-bg": "#FD02A4",
        "barcade-text": "#ffffff",
        "bailalo-bg": "#FBCF6B",
        "bailalo-text": "#B03835",
        "lasalsa-bg": "#E4027D",
        "lasalsa-text": "#ffffff",
        "brass-monkey-bg": "#EDCB39",
        "brass-monkey-text": "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
