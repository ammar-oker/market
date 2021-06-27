import React from 'react';
import { render, screen } from '@testing-library/react';
import RadioButton from '.';

describe('RadioButton', () => {
  it('render RadioButton', () => {
    render(<RadioButton id="1" label="test label" />);
    const radio = screen.getByTestId('1');
    expect(radio.querySelector('input')).toHaveAttribute('type', 'radio');
    expect(radio).toBeInTheDocument();
  });

  it('render RadioButton label', () => {
    render(<RadioButton id="2" label="test label" />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });
});
