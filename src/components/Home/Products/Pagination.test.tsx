import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import products from './dataStapshot';
import ProductList from './ProductList';

describe('Pagination', () => {
  it('render pagination component', () => {
    render(<Pagination page={1} length={15} />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('renders the buttons correctly', () => {
    const length = 15;
    render(<Pagination page={1} length={length} />);
    const buttons: HTMLButtonElement[] = [
      screen.getByTestId('pagination-prev') as HTMLButtonElement,
      screen.getByTestId('pagination-next') as HTMLButtonElement,
    ];
    for (let i = 1; i <= length; i++) {
      const btn = screen.getByTestId(`pagination-btn-${i}`) as HTMLButtonElement;
      buttons.push(btn);
    }
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it('return page number on button click', () => {
    let page = 1;
    render(<Pagination page={1} length={15} onChange={(e) => { page = e; }} />);
    const button5 = screen.getByTestId('pagination-btn-5');
    userEvent.click(button5);
    expect(page).toEqual(5);
  });

  it('prev and next button are working properly', () => {
    render(<ProductList products={products} />);
    const buttonPrev = screen.getByTestId('pagination-prev'); // prev button
    const buttonNext = screen.getByTestId('pagination-next'); // next button
    const button1 = screen.getByTestId('pagination-btn-1'); // first button
    const button2 = screen.getByTestId('pagination-btn-2'); // random button in the middle
    const button3 = screen.getByTestId('pagination-btn-3'); // last button

    // since the page is `1` initially, expect the prev button to disabled
    // and the next button enabled
    expect(buttonPrev).toBeDisabled();
    expect(buttonNext).toBeEnabled();

    // both of prev/next should be enabled be enabled
    // when a page somewhere in the middle is selected
    userEvent.click(button2);
    expect(buttonPrev).toBeEnabled();
    expect(buttonNext).toBeEnabled();

    // only prev button should be enabled when selecting the last page
    userEvent.click(button3);
    expect(buttonPrev).toBeEnabled();
    expect(buttonNext).toBeDisabled();

    // selecting the first page back and expect it to be as the initial state
    userEvent.click(button1);
    expect(buttonPrev).toBeDisabled();
    expect(buttonNext).toBeEnabled();
  });
});
