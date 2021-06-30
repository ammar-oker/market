import React, { FC } from 'react';
import ProductCard from './ProductCard';
import Card from '../../Helpers/Card';
import { Product } from '../types';

interface ProductListProps {
    products: Product[],
    loading: boolean
}
const ProductList: FC<ProductListProps> = ({ products, loading }) => (
  <Card>
    <div className="flex flex-wrap" data-testid="product-list">
      {
                loading ? (
                  [...Array(16).keys()].map((key) => (
                    <div key={key} className="flex-100 md:flex-25 p-2 rounded-md max-w-sm mx-auto">
                      <div className="animate-pulse p-2 border flex flex-col">
                        <div className="rounded-full bg-gray-500 opacity-20 h-10 w-10" />
                        <div className="flex-1 space-y-4 py-1">
                          <div className="space-y-2 pt-6">
                            <div className="h-4 bg-gray-500 opacity-20 rounded w-20" />
                            <div className="h-4 bg-gray-500 opacity-20 rounded w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))

                ) : (
                  products.map((product) => (
                    <div key={product.id} className="flex-100 md:flex-25 mx-auto">
                      <ProductCard product={product} />
                    </div>
                  ))
                )
            }
    </div>
  </Card>
);

export default ProductList;
