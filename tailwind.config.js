/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgray: "#F7F7F7",
        darkRed:"#AA0000",
        primary: "#E0A75E",
        primatyOpacity:"#e0a75e80",
        customred: "#DC2626",
        burgandy:"#AF4B4B",
        lightBurgandy:"#F7EDED",
        green:"#589E67",
        lightGreen:"#EEF5F0",
        purble:"#954BAF",
        lightBurble:"#F4EDF7",
        blue:"#4976F4",
        lightBlue:"#EDF2FE",
        customOrange: {
          lightOrange: "#FCEFDB",
          mediumOrange: "#EFD9A466",
          darkOrange: "#D17D2B",
        },
        secondary: "#A1A1AA",
        lightGray: "#f1f2f3",
        darkGray: "#71717A",
        borderColor: "#d3d3d3",
        mint: "#73bfb8",
        customBlue: {
          mediumBlue: "#accce2",
        },
        customGray: {
          grayText: "#52525B",
          grayLine: "#FAFAFA",
        },
      },
      width: {
        1: "1px",
        "60px": "60px",
        180:"180px",
        "300px": "300px",
        "360px": "360px",
        "460px": "460px",
        "485px": "485px",
        "500px": "500px",
        "530px": "530px",
        "550px": "550px",
        "560px": "560px",
        "600px": "600px",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
        "130vh": "130vh",
        "1/2": "50%",
        "1/3": "33.3333%",
        "2/3": "66.6667%",
        "1/4": "25%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.6667%",
        "5/6": "83.3333%",
        "1/8": "12.5%",
        "3/8": "62.5%",
        "5/8": "87.5%",
        "7/8": "100%",
        90: "90%",
        85: "85%",
        95: "95%",
        200: "200px",
        250: "250px",
        300: "300px",
        310: "310px",
        330: "330px",
        350: "350px",
        370: "370px",
        390: "390px",
        400: "400px",
        450: "450px",
        540: "540px",
        550: "550px",
        700: "700px",
        750: "750px",
        760: "760px",
        800: "800px",
        810: "810px",
        820: "820px",
        830: "830px",
        840: "840px",
        850: "850px",
        860: "860px",
        870: "870px",
        880: "880px",
        890: "890px",
        900: "900px",
      },
      height: {
        "51px":"51px",
        "78vh": "78vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
        "110vh": "110vh",
        "115vh": "115vh",
        "120vh": "120vh",
        "130vh": "130vh",
        "140vh": "140vh",
        "150vh": "150vh",
        "300vh": "300vh",
        "250vh": "250vh",
        "400vh": "400vh",
      },
      borderWidth: {
        1: "1px",
        3:"3px",
      },
      fontSize: {
        8: "8px",
        10: "10px",
        11: "11px",
        12: "12px",
        13: "13px",
        14: "14px",
        15: "15px",
        16: "16px",
        17: "17px",
      },
      gap: {
        "360px": "360px",
        100:"100",
        400:"400px"
      },
    },
  },
  plugins: [],
};