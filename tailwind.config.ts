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
        'background-main': "var(--background-main)",
        'background-sub': "var(--background-sub)",
        'background-third': "var(--background-third)",
        'text-main': "var(--text-main)",
        'text-sub': "var(--text-sub)",
        'border-main': "var(--border-main)",
        'border-sub': "var(--border-sub)",
        'text-hover': "var(--text-hover)"
      },
    },
  },
  darkMode: "media",
  plugins: [],
} satisfies Config;
