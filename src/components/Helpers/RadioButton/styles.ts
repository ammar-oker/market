import { createUseStyles } from 'react-jss';

const styles = {
  circle: {
    borderColor: '#DFDEE2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: '16px',
    fill: '#1EA4CE',
    display: 'none',
  },
  labelText: {
    'font-size': '14px',
  },
  radio: {
    '& input': {
      '&:checked + $circle': {
        borderColor: '#1EA4CE',
        '& $checkIcon': {
          display: 'block',
        },
      },
    },
  },
};

const useStyles = createUseStyles(styles);

export default useStyles;
