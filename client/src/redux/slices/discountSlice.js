import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3333';

export const fetchSendDiscount = createAsyncThunk('/sale/send', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/sale/send`);
    if (response.status > 399) {
      console.log('client error');
      throw new Error('Error: Failed to fetch posts');
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const sendDiscountSlice = createSlice({
  name: 'sendDiscount',
  initialState: {
    status: null, // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSendDiscount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSendDiscount.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchSendDiscount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export default sendDiscountSlice.reducer;
