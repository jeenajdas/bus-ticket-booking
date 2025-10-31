// src/features/buses/busSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as busAPI from "./busAPI";

// ✅ Thunks (API calls)
export const fetchBusCount = createAsyncThunk(
  "buses/count",
  async (_, { rejectWithValue }) => {
    try {
      return await busAPI.getBusCount();
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchBuses = createAsyncThunk(
  "buses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await busAPI.fetchBuses(); // returns list of buses
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addBus = createAsyncThunk(
  "buses/add",
  async (busData, { rejectWithValue }) => {
    try {
      return await busAPI.createBus(busData);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBus = createAsyncThunk(
  "buses/update",
  async (busData, { rejectWithValue }) => {
    try {
      return await busAPI.editBus(busData);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteBus = createAsyncThunk(
  "buses/delete",
  async (busId, { rejectWithValue }) => {
    try {
      await busAPI.removeBus(busId);
      return busId; // return ID to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const disableBus = createAsyncThunk(
  "buses/disable",
  async (busId, { rejectWithValue }) => {
    try {
      return await busAPI.disableBus(busId); // backend should return updated bus
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Slice
const busSlice = createSlice({
  name: "buses",
  initialState: {
    buses: [],
    busCount: 0,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ fetch all buses
      .addCase(fetchBuses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ✅ fetch count
      .addCase(fetchBusCount.fulfilled, (state, action) => {
        state.busCount = action.payload;
      })

      // ✅ add bus
      .addCase(addBus.fulfilled, (state, action) => {
        state.buses.push(action.payload);
        state.busCount += 1;
      })

      // ✅ update bus
      .addCase(updateBus.fulfilled, (state, action) => {
        const idx = state.buses.findIndex(
          (bus) => bus.id === action.payload.id
        );
        if (idx !== -1) state.buses[idx] = action.payload;
      })

      // ✅ delete bus
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.buses = state.buses.filter((bus) => bus.id !== action.payload);
        state.busCount -= 1;
      })

      // ✅ disable bus
      .addCase(disableBus.fulfilled, (state, action) => {
        const idx = state.buses.findIndex(
          (bus) => bus.id === action.payload.id
        );
        if (idx !== -1) state.buses[idx] = action.payload; // update whole object
      });
  },
});

export default busSlice.reducer;
