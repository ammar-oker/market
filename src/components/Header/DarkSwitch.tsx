import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import useStyles from './styles';

const DarkSwitch: FC = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkStorage = localStorage.getItem('dark');
    if (darkStorage && darkStorage === 'true') setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark', 'false');
    }
  }, [dark]);

  const classes = useStyles();
  const toggleDarkMode = (e: ChangeEvent<HTMLInputElement>) => {
    setDark(e.target.checked);
  };

  return (
    <label htmlFor="darkSwitch" data-testid="darkSwitch" className={`${classes.switch} flex items-center cursor-pointer`}>
      <div className="relative">
        <input checked={dark} onChange={toggleDarkMode} type="checkbox" id="darkSwitch" className="sr-only" />
        <div className="block border border-white w-14 h-8 rounded-full" />
        <div className="dot absolute left-1 top-1 w-6 h-6 rounded-full transition">
          <MoonIcon className="hidden fill-current text-secondary dark:block" />
          <SunIcon className="dark:hidden fill-current text-secondary" />
        </div>
      </div>
    </label>
  );
};

export default DarkSwitch;
