import { createSlice } from '@reduxjs/toolkit';

const getCartFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: getCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, { ...action.payload.product, count: action.payload.count }];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
