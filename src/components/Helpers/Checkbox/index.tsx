import React, { ChangeEvent, FC, ReactNode } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import useStyles from './styles';

interface CheckboxProps {
    id: string,
    label?: string | ReactNode,
    name?: string,
    checked?: boolean,
    className?: string,
    disabled?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<CheckboxProps> = ({
  id, name = '', disabled, label = '', checked, onChange, className = '',
}) => {
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${classes.checkbox} flex my-2 items-center ${className}`}>
      <label data-testid={id} htmlFor={id} className="flex items-center cursor-pointer text-xl">
        <input disabled={disabled} id={id} name={name} type="checkbox" className="hidden" checked={checked} onChange={handleChange} />
        <div className={`${classes.square} dark:bg-primary-dark w-5 h-5 inline-block mr-2 rounded-sm flex-no-shrink`}>
          <CheckIcon className={classes.checkIcon} />
        </div>
        <div className={classes.labelText}>{ label }</div>
      </label>
    </div>
  );
};

export default Checkbox;
