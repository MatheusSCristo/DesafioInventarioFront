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
        "blue-600":"#1366D9",
        "red-50":"#FF5378",
        "gray-transparent":"#f0f1f389",
      }

    },
  },
  plugins: [daisyui],
};
