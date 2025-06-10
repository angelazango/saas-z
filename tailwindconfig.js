


// /** @type {import('tailwindcss').Config} */

// import { withUt } from "uploadthing/tw";

// export  default withUt({
//  export const plugins = [
//   require('@tailwindcss/forms'),
//   require('@tailwindcss/forms'),
// ];
// export const Animation = {
//   "accordion-down": "accordion-down 0.2s ease-out",
//   "accordion-up": "accordion-up 0.2s ease-out"
// };
 
 
// });



// export const content = [
//   "./app/**/*.{js,ts,jsx,tsx}",
//   "./pages/**/*.{js,ts,jsx,tsx}",
//   "./components/**/*.{js,ts,jsx,tsx}"
// ];
// export const theme = {
//   extend: {}, 
// };

/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};

export default withUt(config);

