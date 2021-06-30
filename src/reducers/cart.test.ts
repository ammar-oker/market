import cartReducer, {
  addItem, CartState, setTotal, updateItemQuantityById,
} from './cart';

describe('cart reducer', () => {
  const initialState: CartState = {
    cartItems: [],
    total: '0',
  };
  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      cartItems: [],
      total: '0',
    });
  });

  it('should handle addItem', () => {
    const actual = cartReducer(initialState, addItem(
      {
        id: '1', quantity: 2, name: 'Test Item', price: 12,
      },
    ));
    expect(actual.cartItems).toEqual([{
      id: '1', quantity: 2, name: 'Test Item', price: 12,
    }]);
  });

  it('should handle updateItemQuantityById', () => {
    const actualInitial = cartReducer(initialState, addItem(
      {
        id: '1', quantity: 2, name: 'Test Item', price: 12,
      },
    ));
    const actual = cartReducer(actualInitial, updateItemQuantityById({ id: '1', quantity: 1 }));
    expect(actual.cartItems[0]).toEqual({
      id: '1', quantity: 3, name: 'Test Item', price: 12,
    });
  });

  it('should handle setTotal', () => {
    const actual = cartReducer(initialState, setTotal('100'));
    expect(actual.total).toEqual('100');
  });
});
