import React, { FC } from 'react';
import DarkSwitch from './DarkSwitch';
import useStyles from './styles';
import logo from '../../assets/SVGs/logo.svg';
import cart from '../../assets/SVGs/cart.svg';

const Header: FC = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.header} flex justify-between mb-9 px-5 md:px-12 lg:px-26 items-center bg-primary dark:bg-primary-dark`}>
      <div>
        <DarkSwitch />
      </div>
      <div>
        <img data-testid="logo" src={logo} alt="Market" className="w-20 md:w-max" />
      </div>
      <div className="flex h-full px-3 md:px-7 items-center bg-accent text-white">
        <img src={cart} alt="Cart icon" />
        <span className="md:font-semibold pl-3.5">₺ 39,97</span>
      </div>
    </div>
  );
};

export default Header;
