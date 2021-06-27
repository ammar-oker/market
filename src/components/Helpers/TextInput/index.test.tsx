import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '.';

describe('renders text field correctly', () => {
  it('render text input', () => {
    render(<TextInput />);
    const inputEl = screen.getByTestId('text-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');
  });

  it('passes value to test text fields', () => {
    render(<TextInput />);
    const inputEl = screen.getByTestId('text-input') as HTMLInputElement;
    userEvent.type(inputEl, 'hello');
    expect(inputEl).toHaveValue('hello');
  });
});
