import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3333';

export const fetchCategories = createAsyncThunk(
  'categories/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/all`);
      if (response.status > 399) {
        console.log('client error');
        throw new Error('Error: Failed to fetch posts');
      }
      return response.data.map((category) => ({
        ...category,
        image: `${BASE_URL}${category.image}`,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchCategoryById = createAsyncThunk(
  'categories/byId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      if (response.status > 399) {
        console.log('client error');
        throw new Error('Error: Failed to fetch posts');
      }
      return {
        category: response.data.category,
        data: response.data.data.map((prod) => ({
          ...prod,
          image: `${BASE_URL}${prod.image}`,
        })),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: {},
    status: 'idle', // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export default categoriesSlice.reducer;
