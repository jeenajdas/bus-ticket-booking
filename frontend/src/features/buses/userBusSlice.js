import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchBusRoutes } from './busAPI';

export const fetchUserBuses = createAsyncThunk(
  'userBuses/fetch',
  async ({ from, to, date }, { rejectWithValue }) => {
    try {
      const response = await searchBusRoutes({ from, to, date });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userBusSlice = createSlice({
  name: 'userBuses',
  initialState: {
    busesByDate: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUserBuses: (state) => {
      state.busesByDate = {};
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBuses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserBuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busesByDate = action.payload;
      })
      .addCase(fetchUserBuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearUserBuses } = userBusSlice.actions;
export default userBusSlice.reducer;
