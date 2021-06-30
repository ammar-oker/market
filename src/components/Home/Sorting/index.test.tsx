import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting, { SortingItem } from './index';

describe('Sorting', () => {
  it('`price` value is selected initially', () => {
    let selected: SortingItem|undefined;
    render(<Sorting onChange={(e) => {
      selected = e;
    }}
    />);
    expect(selected?.id).toEqual('price');
  });

  it('return the value of the selected radio', () => {
    let selected: SortingItem|undefined;
    const keys = ['-price', 'added', '-added', 'price'];
    render(<Sorting onChange={(e) => {
      selected = e;
    }}
    />);
    keys.forEach((key) => {
      const radio = screen.getByTestId(key);
      userEvent.click(radio);
      expect(selected?.id).toEqual(key);
    });
  });
});
