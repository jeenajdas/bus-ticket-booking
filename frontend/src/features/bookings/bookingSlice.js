// src/features/bookings/bookingSlice.js
// ✅ Added pending/rejected cases so loading state works in UI

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBookings } from './bookingAPI';

export const fetchBookings = createAsyncThunk(
  'bookings/fetch',
  async (_, thunkAPI) => {
    try {
      return await getAllBookings();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch bookings'
      );
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;