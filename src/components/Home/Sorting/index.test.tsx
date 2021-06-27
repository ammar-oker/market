import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting from './index';

describe('Sorting', () => {
  it('`price` value is selected initially', () => {
    let selected: string|number = '';
    render(<Sorting onChange={(e) => {
      selected = e;
    }}
    />);
    expect(selected).toEqual('price');
  });

  it('return the value of the selected radio', () => {
    let selected: string|number = '';
    render(<Sorting onChange={(e) => {
      selected = e;
    }}
    />);

    const newRadio = screen.getByTestId('new');
    userEvent.click(newRadio);
    expect(selected).toEqual('new');
  });
});
