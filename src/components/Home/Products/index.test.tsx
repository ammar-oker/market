import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import products from './dataStapshot';
import ProductList from './ProductList';

describe('Products', () => {
  it('render the products correctly', () => {
    render(<ProductList products={products} />);

    products.filter((item) => item.itemType === 'mug') // initially, only `mug` products should be rendered
      .forEach((product) => {
        const elements = [
          screen.getByTestId(`product-card-${product.id}`),
          screen.getByText(product.name),
          screen.getByText(`₺ ${product.price}`),
        ];
        elements.forEach((el) => {
          expect(el).toBeInTheDocument();
        });
      });
  });

  it('update products on itemType change', () => {
    render(<ProductList products={products} />);
    const mugCategoryButton = screen.getByTestId('category-button-mug');
    const shirtCategoryButton = screen.getByTestId('category-button-shirt');

    userEvent.click(shirtCategoryButton);
    products.filter((item) => item.itemType === 'shirt')
      .forEach((item) => {
        expect(screen.getByTestId(`product-card-${item.id}`)).toBeInTheDocument();
      });
    products.filter((item) => item.itemType === 'mug')
      .forEach((item) => {
        expect(screen.queryByTestId(`product-card-${item.id}`)).not.toBeInTheDocument();
      });

    userEvent.click(mugCategoryButton);
    products.filter((item) => item.itemType === 'mug')
      .forEach((item) => {
        expect(screen.getByTestId(`product-card-${item.id}`)).toBeInTheDocument();
      });
    products.filter((item) => item.itemType === 'shirt')
      .forEach((item) => {
        expect(screen.queryByTestId(`product-card-${item.id}`)).not.toBeInTheDocument();
      });
  });

  it('update products on pagination', () => {
    render(<ProductList products={products} />);
    const paginationButton2 = screen.getByTestId('pagination-btn-2');
    const productList = screen.getByTestId('product-list');

    // since total `mug` elements are 3
    // AND perPage value is 2, expect to have only two elements on the first page
    // and 1 element on the second page
    expect(productList.childElementCount).toEqual(2);
    userEvent.click(paginationButton2);
    expect(productList.childElementCount).toEqual(1);
  });
});
