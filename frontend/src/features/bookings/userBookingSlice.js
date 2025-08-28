import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, getUserBookings } from './bookingAPI';

export const bookSeats = createAsyncThunk(
  'userBooking/bookSeats',
  async ({ bookingData, token }, thunkAPI) => {
    try {
      return await createBooking(bookingData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Booking failed');
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  'userBooking/fetchUserBookings',
  async (token, thunkAPI) => {
    try {
      return await getUserBookings(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load bookings');
    }
  }
);

const userBookingSlice = createSlice({
  name: 'userBooking',
  initialState: {
    status: 'idle',
    error: null,
    successData: null,
    myBookings: [],
    myBookingsStatus: 'idle',
    myBookingsError: null,
  },
  reducers: {
    clearBookingState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.successData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Booking
      .addCase(bookSeats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(bookSeats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successData = action.payload;
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // My Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.myBookingsStatus = 'loading';
        state.myBookingsError = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.myBookingsStatus = 'succeeded';
        state.myBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.myBookingsStatus = 'failed';
        state.myBookingsError = action.payload;
      });
  },
});

export const { clearBookingState } = userBookingSlice.actions;
export default userBookingSlice.reducer;
