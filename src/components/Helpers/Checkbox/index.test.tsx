import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '.';

describe('Checkbox', () => {
  it('render checkbox', () => {
    render(<Checkbox id="1" />);
    const checkbox = screen.getByTestId('1');
    expect(checkbox.querySelector('input')).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('render label', () => {
    render(<Checkbox id="2" label="test label" />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it('toggle checkbox', () => {
    render(<Checkbox id="3" />);
    const checkbox = screen.getByTestId('3');

    // initially not checked
    expect(checkbox.querySelector('input')).not.toBeChecked();

    // Execute the click event of the checkbox
    userEvent.click(checkbox);
    expect(checkbox.querySelector('input')).toBeChecked();

    // Execute the click event again
    userEvent.click(checkbox);
    expect(checkbox.querySelector('input')).not.toBeChecked();
  });
});
