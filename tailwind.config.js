/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'figtree': ['var(--font-figtree)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "item-btn-bg": "var(--item-btn-bg)",
        "item-btn-text": "var(--item-btn-text)",
        "item-detail-bg": "var(--item-detail-bg)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2A6365", // for buttons
          "primary-content": "#ffffff", // button text color
          secondary: "#2A6365", //blue - for headers
          "base-100": "#F5F5F5", // main background
          "base-content": "#333333", // main text color
          neutral: "#333333", // for top nav bg
          "neutral-content": "#F2F0EC", // for logo bg
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#F5F5F5", // for buttons
          "primary-content": "#2A6365", // button text color
          secondary: "#D9D986", // green - for headers
          "base-100": "#141414", // main background
          "base-content": "#F5F5F5", // main text color
          neutral: "#333333", // for top nav bg
          "neutral-content": "#141414", // for logo bg
        },
      },
    ],
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('daisyui'),
  ],
};
