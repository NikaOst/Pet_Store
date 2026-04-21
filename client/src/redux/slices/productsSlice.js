import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3333';

export const fetchProducts = createAsyncThunk('products/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/all`);
    if (response.status > 399) {
      console.log('client error');
      throw new Error('Error: Failed to fetch posts');
    }
    return response.data.map((product) => ({
      ...product,
      image: `${BASE_URL}${product.image}`,
    }));
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchProductById = createAsyncThunk(
  'products/byId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      const product = response.data[0];
      const response_category = await axios.get(`${BASE_URL}/categories/${product.categoryId}`);
      if (response.status > 399 || response_category.status > 399) {
        console.log('client error');
        throw new Error('Error: Failed to fetch posts');
      }

      return {
        ...product,
        image: `${BASE_URL}${product.image}`,
        category: response_category.data.category,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    status: 'idle', // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export default productsSlice.reducer;
