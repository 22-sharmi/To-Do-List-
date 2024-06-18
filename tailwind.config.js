/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage : (theme) =>({
        'custom-background' : "url('./src/assets/backGround.jpg')"
       })
    },
  },
  plugins: [],
}

