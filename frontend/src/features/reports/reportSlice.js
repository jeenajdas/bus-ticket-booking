import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTotalCollectionByDate, getCollectionByBus } from './reportAPI';

export const fetchTotalCollection = createAsyncThunk('reports/total', getTotalCollectionByDate);
export const fetchBusCollections = createAsyncThunk('reports/bus', getCollectionByBus);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    totalCollection: [],
    busCollections: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalCollection.fulfilled, (state, action) => {
        state.totalCollection = action.payload;
      })
      .addCase(fetchBusCollections.fulfilled, (state, action) => {
        state.busCollections = action.payload;
      });
  },
});

export default reportSlice.reducer;
