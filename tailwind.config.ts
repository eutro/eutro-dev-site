import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./{src,resources}/*.{html,js,ts,tsx}",
    "./{src,resources}/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'BlinkMacSystemFont',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config

