/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  Plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
  ],
};
