import React, { FC, useEffect, useState } from 'react';
import { MinusSmIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addItem, CartItem, selectCartItems, updateItemQuantityById,
} from '../../../reducers/cart';
import { Product } from '../types';

interface ProductCardProps {
    product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [cartInfo, setCartInfo] = useState<CartItem>();

  useEffect(() => {
    const currentProductIndex = cartItems.findIndex((item) => (item.id === product.id));
    if (cartItems[currentProductIndex]) {
      setCartInfo(cartItems[currentProductIndex]);
    } else {
      setCartInfo(undefined);
    }
  }, [cartItems]);

  const addItemToCart = ({ id, name, price }: Product) => {
    dispatch(addItem({
      id, name, price, quantity: 1,
    }));
  };

  const updateCart = (id: string, quantity: number) => {
    dispatch(updateItemQuantityById({ id, quantity }));
  };

  return (
    <div data-testid={`product-card-${product.id}`} className="mx-auto w-full md:w-30 pb-5 h-full flex flex-col justify-between">
      <div>
        <div className="p-4 border-2 border-selago flex items-center dark:border-gray-500 md:h-30 w-full md:w-30 rounded-xl">
          <img
            width={92}
            height={92}
            src={`https://source.unsplash.com/92x92/?${product.itemType},${product.id}`}
            alt={product.description}
            className="m-auto"
          />
        </div>
        <div className="text-sm-1 font-bold text-primary py-1.5">
          {`₺ ${product.price}`}
        </div>
        <div className="text-sm-1 font-bold text-black-title dark:text-gray-50 py-1.5">
          {product.name}
        </div>
      </div>
      {
            cartInfo ? (
              <div className="h-5 border border-primary w-full text-xs rounded-sm flex justify-between">
                <button
                  type="button"
                  className="flex w-7 bg-primary h-full focus:outline-none"
                  onClick={() => { updateCart(product.id, -1); }}
                >
                  {
                              cartInfo.quantity > 1 ? (
                                <MinusSmIcon className="m-auto h-5 w-5 fill-currentColor text-white" />
                              ) : (
                                <TrashIcon className="m-auto h-4 w-4 fill-currentColor text-white" />
                              )
                          }
                </button>
                <div className="text-primary">
                  <span className="align-middle leading-5 font-bold">
                    {cartInfo.quantity}
                  </span>
                </div>
                <button
                  type="button"
                  className="flex w-7 bg-primary h-full focus:outline-none"
                  onClick={() => { updateCart(product.id, 1); }}
                >
                  <PlusIcon className="m-auto h-5 w-5 fill-currentColor text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="h-5 bg-primary w-full text-xs text-white rounded-sm"
                onClick={() => { addItemToCart(product); }}
              >
                Add
              </button>
            )
        }
    </div>
  );
};

export default ProductCard;
