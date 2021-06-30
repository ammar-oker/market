import React, { ChangeEvent, FC } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import useStyles from './styles';

export interface RadioButtonProps {
    id: string,
    label?: string,
    name?: string,
    checked?: boolean,
    className?: string,
    disabled?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: FC<RadioButtonProps> = ({
  id, label = '', checked, onChange, name = '', className = '', disabled,
}: RadioButtonProps) => {
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${classes.radio} flex my-2 items-center ${className}`}>
      <label data-testid={id} htmlFor={id} className="flex items-center cursor-pointer text-xl">
        <input disabled={disabled} id={id} name={name} type="radio" className="hidden" checked={checked} onChange={handleChange} />
        <div className={`${classes.circle} w-5 h-5 inline-block mr-2 rounded-full border-2 flex-no-shrink`}>
          <CheckIcon className={classes.checkIcon} />
        </div>
        <span className={classes.labelText}>{ label }</span>
      </label>
    </div>
  );
};

export default RadioButton;
