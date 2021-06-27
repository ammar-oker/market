import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from './index';

describe('RadioGroup', () => {
  test('RadioGroup works correctly', () => {
    let selectedRadio = null;
    const handleChange = (e: string|number) => {
      selectedRadio = e;
    };
    const radioGroup = render(<RadioGroup
      items={[
        { id: '0', label: 'test radio 1' },
        { id: '1', label: 'test radio 2' },
      ]}
      onChange={handleChange}
    />);
    const radio1 = radioGroup.getByTestId('0'); // first radio label element
    const radio2 = radioGroup.getByTestId('1'); // second radio label element

    // expect the radio input to have the right attribute
    expect(radio1.querySelector('input')).toHaveAttribute('type', 'radio');

    // expect the first radio to be checked initially
    expect(radio1.querySelector('input')).toBeChecked();

    // click on the second radio and expect it to be checked
    userEvent.click(radio2);
    expect(selectedRadio).toEqual('1'); // onChange event returns the ID of selected radio
    expect(radio2.querySelector('input')).toBeChecked();

    // click on the first radio and expect it to be checked back
    userEvent.click(radio1);
    expect(selectedRadio).toEqual('0'); // onChange event returns the ID of selected radio
    expect(radio1.querySelector('input')).toBeChecked();
  });
});
