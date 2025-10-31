import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBookings } from './bookingAPI';

export const fetchBookings = createAsyncThunk('bookings/fetch', getAllBookings);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
    });
  },
});

export default bookingSlice.reducer;
