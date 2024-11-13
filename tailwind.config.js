import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "gray-50":"#F0F1F3",
        "gray-500":"#667085",
        "gray-600":"#5D6679",
        "gray-800":"#383E49",
      }

    },
  },
  plugins: [daisyui],
};
