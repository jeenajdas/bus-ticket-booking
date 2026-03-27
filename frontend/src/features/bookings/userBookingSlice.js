import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import { getUserBookings } from './bookingAPI';

/* ================================
   1️⃣ CREATE BOOKING (Pending)
================================ */
export const createBooking = createAsyncThunk(
  'userBooking/createBooking',
  async ({ bookingData, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        '/bookings/create',
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Create booking failed'
      );
    }
  }
);

/* ================================
   2️⃣ CONFIRM BOOKING
================================ */
export const confirmBooking = createAsyncThunk(
  'userBooking/confirmBooking',
  async ({ bookingId, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/bookings/confirm/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Confirm booking failed'
      );
    }
  }
);

/* ================================
   3️⃣ FETCH MY BOOKINGS (existing)
================================ */
export const fetchUserBookings = createAsyncThunk(
  'userBooking/fetchUserBookings',
  async (token, thunkAPI) => {
    try {
      return await getUserBookings(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to load bookings'
      );
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

      /* CREATE BOOKING */
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successData = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* CONFIRM BOOKING */
      .addCase(confirmBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successData = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* FETCH MY BOOKINGS */
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
