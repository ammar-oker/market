import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters, { CheckboxItems } from './index';

const items: CheckboxItems = {
  check1: { id: 'check1', label: 'first', checked: false },
  check2: { id: 'check2', label: 'first and second', checked: false },
  check3: { id: 'check3', label: 'only third', checked: false },
};

describe('Filters', () => {
  it('filter items on search', () => {
    let filteredItems: CheckboxItems = {};
    const handleSearchResults = (_items: CheckboxItems) => {
      filteredItems = _items;
    };
    render(<Filters items={items} onSearchResults={handleSearchResults} />);
    const inputEl = screen.getByTestId('text-input') as HTMLInputElement;

    // filtered items must contain all items initially
    expect(filteredItems).toEqual(items);

    // get all elements contain the word 'First' in the label
    // WITH case-insensitivity
    userEvent.type(inputEl, 'FirSt');
    expect(filteredItems).toEqual({
      check1: { id: 'check1', label: 'first', checked: false },
      check2: { id: 'check2', label: 'first and second', checked: false },
    });

    userEvent.clear(inputEl); // clear input field
    userEvent.type(inputEl, 'third');
    expect(filteredItems).toEqual({
      check3: { id: 'check3', label: 'only third', checked: false },
    });

    userEvent.clear(inputEl);
    expect(filteredItems).toEqual(items);
  });

  it('uncheck `All` checkbox on another item selection', () => {
    render(<Filters title="test-title" items={items} />);
    const selectAllCheckbox = screen.getByTestId('test-title-all');
    const filterCheckbox = screen.getByTestId('check2');
    expect(selectAllCheckbox.querySelector('input')).toBeChecked();
    userEvent.click(filterCheckbox);
    expect(selectAllCheckbox.querySelector('input')).not.toBeChecked();
  });

  it('uncheck all checkboxes on `All` select', () => {
    render(<Filters title="test-title" items={items} />);
    const selectAllCheckbox = screen.getByTestId('test-title-all');
    const filterCheckbox = screen.getByTestId('check2');
    userEvent.click(filterCheckbox);
    userEvent.click(selectAllCheckbox);
    expect(filterCheckbox.querySelector('input')).not.toBeChecked();
  });

  it('tracks selected items', () => {
    let selectedItems: CheckboxItems = {};
    render(<Filters
      items={items}
      updateSelectedItems={(e: CheckboxItems) => {
        selectedItems = e;
      }}
    />);
    const check1 = screen.getByTestId('check1');
    const check2 = screen.getByTestId('check2');
    userEvent.click(check1);
    userEvent.click(check2);
    expect(selectedItems).toEqual({
      check1: { id: 'check1', label: 'first', checked: true },
      check2: { id: 'check2', label: 'first and second', checked: true },
    });
  });
});
