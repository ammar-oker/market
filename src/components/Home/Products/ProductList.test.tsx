import React from 'react';
import { render, screen } from '@testing-library/react';
import products from './dataStapshot';
import ProductList from './ProductList';

describe('ProductList', () => {
  it('renders ProductList', () => {
    render(<ProductList perPage={16} margin={0} products={products} />);
    products.forEach(((product) => {
      const productEl = screen.getByTestId(`product-card-${product.id}`);
      expect(productEl).toBeInTheDocument();
    }));
  });
});
