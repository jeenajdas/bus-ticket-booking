// src/features/reports/reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTotalCollection, getCollectionByBus } from './reportAPI';

// Fetch total collection (all buses)
export const fetchTotalCollection = createAsyncThunk(
  'reports/total',
  async () => {
    const data = await getTotalCollection();
    return data; // plain number
  }
);

// Fetch collection by bus (pass busId)
export const fetchBusCollections = createAsyncThunk(
  'reports/bus',
  async (busId) => {
    const data = await getCollectionByBus(busId);
    return { busId, totalAmount: data }; // return object for each bus
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    totalCollection: 0,     // number, not array
    busCollections: [],     // array of { busId, totalAmount }
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalCollection.fulfilled, (state, action) => {
        state.totalCollection = action.payload;
      })
      .addCase(fetchBusCollections.fulfilled, (state, action) => {
        // if bus already exists, update it, else push new
        const existingIndex = state.busCollections.findIndex(
          (b) => b.busId === action.payload.busId
        );
        if (existingIndex !== -1) {
          state.busCollections[existingIndex] = action.payload;
        } else {
          state.busCollections.push(action.payload);
        }
      });
  },
});

export default reportSlice.reducer;
