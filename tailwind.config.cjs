/** @type {import('tailwindcss').Config} */
module.exports =  {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      zIndex: {
        1: "1",
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
