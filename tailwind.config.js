/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        blueish: "#043F97",
        grayish: "#f9f9f9",
        amberOrange: "#FF9900",
        charcoalBlack: "#343434",
        pureWhite: "#FFFFFF",
        bgColor: "#f9f9f9",
      },  
    },
  },
  plugins: [],
}

