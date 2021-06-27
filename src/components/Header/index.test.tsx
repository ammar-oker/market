import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './index';
import logo from '../../assets/SVGs/logo.svg';

describe('Header', () => {
  it('renders the logo correctly', () => {
    const header = render(<Header />);
    const logoImg = header.getByTestId('logo') as HTMLImageElement;
    expect(logoImg.src).toContain(logo);
  });

  it('toggle DarkSwitch', () => {
    render(<Header />);
    const darkSwitch = screen.getByTestId('darkSwitch') as HTMLInputElement;
    const html = document.documentElement;
    userEvent.click(darkSwitch); // set to dark
    expect(html).toHaveClass('dark');
    userEvent.click(darkSwitch); // set it back to light
    expect(html).not.toHaveClass('dark');
  });
});
