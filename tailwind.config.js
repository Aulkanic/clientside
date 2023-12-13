/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        blueish: "#0767A5",
        blueish00: "#56AAE1",
        grayish: "#f9f9f9",
        amberOrange: "#FF9900",
        charcoalBlack: "#343434",
        pureWhite: "#FFFFFF",
        bgColor: "#f9f9f9",
      },  
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

