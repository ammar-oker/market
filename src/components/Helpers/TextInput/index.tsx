import React, { ChangeEvent, FC } from 'react';

interface TextInputProps {
    id?: string,
    value?: string,
    placeholder?: string,
    className?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<TextInputProps> = ({
  value, onChange, placeholder = '', id = '', className = '',
}) => (
  <input
    id={id}
    data-testid="text-input"
    value={value}
    type="text"
    placeholder={placeholder}
    className={`border-2 h-12 px-3.5 dark:bg-dark-bg rounded-sm border-input-border-light dark:border-gray-500 w-full ${className}`}
    onChange={onChange}
  />
);
export default TextInput;
