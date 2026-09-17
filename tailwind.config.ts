import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        cream: "var(--cream)",
        paper: "var(--paper)",
        line: "var(--line)",
        sage: "var(--sage)",
        forest: "var(--forest)",
        amber: "var(--amber)",
      },
      borderRadius: {
        '22px': 'var(--radius)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
