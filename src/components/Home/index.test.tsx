import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

// TODO add Sorting, Filtering, and API requests here

describe('Home', () => {
  it('sort items correctly', () => {
    render(<Home />);
  });
});
