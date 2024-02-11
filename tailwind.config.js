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
      boxShadow: {
        'border': '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
        'shine': 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
      },  
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

