import React, { FC, useEffect } from 'react';
import {
  MinusSmIcon, PlusIcon, ShoppingCartIcon, TrashIcon,
} from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectCartItems, selectCartTotal, setTotal, updateItemQuantityById,
} from '../../../reducers/cart';

const Cart: FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    dispatch(setTotal(totalAmount.toFixed(2)));
  }, [cartItems]);

  const updateCart = (id: string, quantity: number) => {
    dispatch(updateItemQuantityById({ id, quantity }));
  };

  return (
    <div className="border-8 border-primary h-80 dark:border-gray-800 rounded-sm bg-white dark:bg-primary-dark p-4">
      {
        cartItems.length ? (
          <>
            <div style={{ height: '189px' }} className="overflow-y-auto">
              {
                    cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-divider py-2.5">
                        <div>
                          <div className="text-sm-1 text-black-title dark:text-secondary">{item.name}</div>
                          <div className="text-sm-1 font-semibold text-primary">
                            {`₺${item.price}`}
                          </div>
                        </div>
                        <div className="flex">
                          <button type="button" onClick={() => { updateCart(item.id, -1); }}>
                            <div className="h-8 w-8 flex">
                              {
                                  item.quantity > 1 ? (
                                    <MinusSmIcon className="m-auto h-6 w-6 fill-currentColor text-primary" />
                                  ) : (
                                    <TrashIcon className="m-auto h-5 w-5 fill-currentColor text-primary" />
                                  )
                                }
                            </div>
                          </button>
                          <div className="h-8 w-8 text-center text-white bg-primary">
                            <span className="align-middle">{item.quantity}</span>
                          </div>
                          <button type="button" onClick={() => { updateCart(item.id, 1); }}>
                            <div className="h-8 w-8 flex">
                              <PlusIcon className="m-auto h-6 w-6 fill-currentColor text-primary" />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))
                  }
            </div>
            <div className="flex justify-end pt-4">
              <button type="button" className="border-2 border-primary px-5 py-4 focus:outline-none rounded-sm">
                <span className="text-sm-1 font-semibold text-primary">
                  {`₺${total}`}
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex mt-8">
            <div className="m-auto opacity-20 flex flex-col">
              <ShoppingCartIcon className="h-20 w-20 mx-auto" />
              <div className="text-center">No items in the cart yet</div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Cart;
