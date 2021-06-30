import React, { FC } from 'react';
import DarkSwitch from './DarkSwitch';
import useStyles from './styles';
import logo from '../../assets/SVGs/logo.svg';
import cart from '../../assets/SVGs/cart.svg';
import { useAppSelector } from '../../store/hooks';
import { selectCartTotal } from '../../reducers/cart';

const Header: FC = () => {
  const classes = useStyles();
  const total = useAppSelector(selectCartTotal);
  return (
    <div className={`${classes.header} w-full mb-9 bg-primary dark:bg-primary-dark`}>
      <div className="flex h-full justify-between container mx-auto items-center">
        <div className="pl-2">
          <DarkSwitch />
        </div>
        <div>
          <img data-testid="logo" src={logo} alt="Market" className="w-20 md:w-max" />
        </div>
        <div className="flex h-full px-3 md:px-7 items-center bg-accent text-white">
          <img src={cart} alt="Cart icon" />
          <span className="md:font-semibold text-center w-24">{`₺ ${total}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
