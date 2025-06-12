import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as busAPI from './busAPI';

export const fetchBuses = createAsyncThunk('buses/fetch', busAPI.getAllBuses);
export const addBus = createAsyncThunk('buses/add', busAPI.createBus);
export const updateBus = createAsyncThunk('buses/update', busAPI.editBus);
export const deleteBus = createAsyncThunk('buses/delete', busAPI.removeBus);
export const disableBus = createAsyncThunk('buses/disable', busAPI.disableBus);

const busSlice = createSlice({
  name: 'buses',
  initialState: {
    buses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.buses = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addBus.fulfilled, (state, action) => {
        state.buses.push(action.payload);
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        const idx = state.buses.findIndex(bus => bus.id === action.payload.id);
        if (idx !== -1) state.buses[idx] = action.payload;
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.buses = state.buses.filter(bus => bus.id !== action.payload);
      })
      .addCase(disableBus.fulfilled, (state, action) => {
        const bus = state.buses.find(bus => bus.id === action.payload.id);
        if (bus) bus.disabled = true;
      });
  },
});

export default busSlice.reducer;
