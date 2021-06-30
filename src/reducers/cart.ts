import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { RootState } from '../store';

export interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity: number
}

export interface CartState {
    cartItems: CartItem[],
    total: string
}

const initialState: CartState = {
  cartItems: [],
  total: '0',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (state.cartItems[index]) { // item already exist
        state.cartItems[index].quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    updateItemQuantityById: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (action.payload.quantity < 1 && state.cartItems[index].quantity === 1) {
        // when the user tries to decrease single item remove that item
        state.cartItems = state.cartItems.filter((item) => (item.id !== action.payload.id));
      } else {
        // update the cart
        state.cartItems = produce(state.cartItems, (draft) => {
          draft[index].quantity += action.payload.quantity;
        });
      }
    },
    setTotal: (state, action: PayloadAction<string>) => {
      state.total = action.payload;
    },
  },
});

export const selectCartItems = (state: RootState): CartItem[] => state.cart.cartItems;
export const selectCartTotal = (state: RootState): string => state.cart.total;

export const { addItem, updateItemQuantityById, setTotal } = cartSlice.actions;

export default cartSlice.reducer;
