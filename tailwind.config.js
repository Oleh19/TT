/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['mt-5', 'flex-col', 'md:flex-row', 'flex-row'],
  theme: {
    extend: {
      maxWidth: {
        layout: '1164px',
        modal: '480px',
      },
      width: {
        modal: '480px',
      },
      maxHeight: {
        '90vh': '90vh',
      },
      minWidth: {
        button: '150px',
      },
      minHeight: {
        textarea: '88px',
      },
      borderRadius: {
        button: '32px',
        tag: '20px',
      },
      fontSize: {
        modal: '18px',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          100: '#FEFEFE',
          200: '#F6F6F6',
          300: '#EEEEEE',
          400: '#EFEFF2',
          500: '#D4D4D4',
          600: '#A8A8A8',
          700: '#707070',
          800: '#515151',
          900: '#262626',
          DEFAULT: '#262626',
          foreground: '#FEFEFE',
        },
        secondary: {
          DEFAULT: '#F6F6F6',
          foreground: '#262626',
        },
        success: {
          100: '#DAFFEF',
          200: '#9DE9C9',
          300: '#6DDDAE',
          400: '#3CD293',
          500: '#0BC778',
          600: '#099F60',
        },
        warning: {
          100: '#FCECD3',
          200: '#F9D9A7',
          300: '#F5C57B',
          400: '#F2B24F',
          500: '#EF9F23',
        },
        error: {
          100: '#FFDDDD',
          200: '#FFBBBB',
          300: '#FF9A9A',
          400: '#FF7878',
          500: '#FF5656',
        },
        accent: {
          DEFAULT: '#F6F6F6',
          foreground: '#262626',
        },
        column: {
          DEFAULT: '#F6F6F8',
        },
        border: '#EEEEEE',
        input: '#EEEEEE',
        ring: '#262626',
      },
    },
  },
  plugins: [],
}
