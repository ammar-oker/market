import { createUseStyles } from 'react-jss';

const styles = {
  header: {
    height: '76.64px',
  },
  switch: {
    '& input:checked ~ .dot': {
      transform: 'translateX(100%)',
    },
  },
};
const useStyles = createUseStyles(styles);

export default useStyles;
