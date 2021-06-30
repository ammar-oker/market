import { createUseStyles } from 'react-jss';

const styles = {
  square: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 1px 7px rgba(93, 56, 192, 0.4)',
  },
  checkIcon: {
    width: '16px',
    fill: '#FFFFFF',
    display: 'none',
  },
  labelText: {
    'font-size': '14px',
    maxWidth: '80%',
  },
  checkbox: {
    '& input': {
      '&:checked + $square': {
        backgroundColor: '#1EA4CE',
        '& $checkIcon': {
          display: 'block',
        },
      },
    },
  },
};

const useStyles = createUseStyles(styles);

export default useStyles;
