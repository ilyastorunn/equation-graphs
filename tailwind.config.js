/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#F5F5F5",
        "lucky-point-50": "#EEF4FF",
        "lucky-point-100": "#D9E5FF",
        "lucky-point-200": "#BCD3FF",
        "lucky-point-300": "#8EB7FF",
        "lucky-point-400": "#5890FF",
        "lucky-point-500": "#3267FF",
        "lucky-point-600": "#1B45F5",
        "lucky-point-700": "#1431E1",
        "lucky-point-800": "#1729B6",
        "lucky-point-900": "#19298F",
        "lucky-point-950": "#161E60",
        "lucky-point-950-opc80": "rgba(22, 30, 96, 0.8)",
      },
      fontFamily: {
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
