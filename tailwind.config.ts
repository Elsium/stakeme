import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"]
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#000000',
        secondary: '#0C0D0E',
        tertiary: '#9AB1CF26',
        icon: '#7C8798',
        link: '#89C4FF',
        textPrimary: '#FFFFFF',
        textSecondary: '#FAFAFA',
        textTertiary: '#9AB1CF',
      }
    },
  },
  plugins: [],
};
export default config;
