import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './index';

describe('render Card', () => {
  it('render Card component', () => {
    render(<Card />);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });
});
