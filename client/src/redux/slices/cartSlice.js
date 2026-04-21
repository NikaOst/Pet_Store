import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3333';

export const fetchCreateOrder = createAsyncThunk('send', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/order/send`);
    if (response.status > 399) {
      console.log('client error');
      throw new Error('Error: Failed to fetch posts');
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getCartFromStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) ?? [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: getCartFromStorage(),
    status: null, // loading, succeeded, failed
    error: null,
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
    updateCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    closeModalWindow: (state) => {
      state.status = null;
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCreateOrder.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchCreateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateCart, closeModalWindow, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
