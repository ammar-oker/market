// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1EA4CE',
        'primary-dark': colors.trueGray['900'],
        secondary: '#F2F0FD',
        'secondary-dark': '#F2F0FD',
        'light-bg': colors.trueGray['200'],
        'dark-bg': colors.trueGray['800'],
        accent: '#147594',
        white: colors.white,
        black: colors.black,
        'body-light': '#525252',
        'title-light': '#697488',
        'input-border-light': '#E0E0E0',
        selago: '#F3F0FE',
        'black-title': '#191919',
        divider: '#F4F4F4',
        'main-title': '#6F6F6F',
      },
      spacing: {
        5: '22px',
        9: '38px',
        26: '104px',
        30: '124px',
        34: '135px',
        75: '296px',
      },
      flex: {
        25: '1 1 25%',
      },
      fontSize: {
        'xs-1': '0.813rem',
        sm: '0.8125rem',
        'sm-1': '0.875rem',
      },
    },
  },
  variants: {
    extend: {
      display: ['dark'],
    },
  },
  plugins: [],
};
