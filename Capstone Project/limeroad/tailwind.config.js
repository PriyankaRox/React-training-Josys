/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src folder
    "./public/index.html",        // Include the main HTML file if applicable
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Example custom color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Example plugin for styling forms
  ],
}

