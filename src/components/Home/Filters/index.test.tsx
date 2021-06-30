import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters, { CheckboxItem } from './index';

const items: CheckboxItem[] = [
  {
    id: 'check1',
    value: 'first',
    label: 'first',
    checked: false,
  },
  {
    id: 'check2',
    value: 'first-second',
    label: 'first and second',
    checked: false,
  },
  {
    id: 'check3',
    value: 'third',
    label: 'only third',
    checked: false,
  },
];

describe('Filters', () => {
  it('filter items on search', () => {
    let filteredItems: CheckboxItem[] = [];
    const handleSearchResults = (_items: CheckboxItem[]) => {
      filteredItems = _items;
    };
    render(<Filters items={items} onSearchResults={handleSearchResults} />);
    const inputEl = screen.getByTestId('text-input') as HTMLInputElement;

    // filtered items must contain all items initially
    expect(filteredItems).toEqual(items);

    // get all elements contain the word 'First' in the label
    // WITH case-insensitivity
    userEvent.type(inputEl, 'FirSt');
    expect(filteredItems).toEqual([
      {
        id: 'check1',
        value: 'first',
        label: 'first',
        checked: false,
      },
      {
        id: 'check2',
        value: 'first-second',
        label: 'first and second',
        checked: false,
      },
    ]);

    userEvent.clear(inputEl); // clear input field
    userEvent.type(inputEl, 'third');
    expect(filteredItems).toEqual([{
      id: 'check3',
      value: 'third',
      label: 'only third',
      checked: false,
    }]);

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
    let selectedItems: CheckboxItem[] = [];
    render(<Filters
      items={items}
      updateSelectedItems={(e: CheckboxItem[]) => {
        selectedItems = e;
      }}
    />);
    const check1 = screen.getByTestId('check1');
    const check2 = screen.getByTestId('check2');
    userEvent.click(check1);
    userEvent.click(check2);
    expect(selectedItems).toEqual([
      {
        id: 'check1',
        value: 'first',
        label: 'first',
        checked: true,
      },
      {
        id: 'check2',
        value: 'first-second',
        label: 'first and second',
        checked: true,
      },
    ]);
  });
});
