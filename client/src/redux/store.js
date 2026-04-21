import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import sendDiscountReducer from './slices/discountSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    sendDiscount: sendDiscountReducer,
    cart: cartReducer,
  },
});
export default store;
