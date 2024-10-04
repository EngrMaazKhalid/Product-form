/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   
        extend: {
          // colors: {
          //   primary: "#082f49",
          //   secondary: "#00CDBD",
          //   // primarylight: "#0a3450e5",
          //   primarylight: "rgb(34 62 111)",
          //   // primarylight: "#155e75",
          //   secondarylight: "#16282C",
          //   TextColor: "#e4efff",
          // },
          colors: {
            primary: "#181A20",
            secondary: "#00CDBD",
            primarylight: "#252525",
            secondarylight: "#16282C",
          },
          fontFamily: {
            pthin: ["Poppins-Thin", "sans-serif"],
            pextralight: ["Poppins-ExtraLight", "sans-serif"],
            plight: ["Poppins-Light", "sans-serif"],
            pregular: ["Poppins-Regular", "sans-serif"],
            pmedium: ["Poppins-Medium", "sans-serif"],
            psemibold: ["Poppins-SemiBold", "sans-serif"],
            pbold: ["Poppins-Bold", "sans-serif"],
            pextrabold: ["Poppins-ExtraBold", "sans-serif"],
            pblack: ["Poppins-Black", "sans-serif"],
          },
   
        
    
    },
  },
  plugins: [],
};
