// src/features/users/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance"; // ✅ use your existing instance
import { fetchUsers, deleteUser } from "./userAPI";

// ── Fetch all users ──────────────────────────────────────────
export const getUsers = createAsyncThunk("users/getUsers", async (_, thunkAPI) => {
  try {
    return await fetchUsers();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// ── Delete user ──────────────────────────────────────────────
export const removeUser = createAsyncThunk("users/removeUser", async (userId, thunkAPI) => {
  try {
    await deleteUser(userId);
    return userId; // returns the id so reducer can filter it out
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

// ── Ban user ─────────────────────────────────────────────────
// Fixed: switched from raw axios → axiosInstance
export const banUser = createAsyncThunk("users/banUser", async (userId, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`/users/${userId}/ban`);
    return res.data; // backend should return the updated user object
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Error banning user");
  }
});

// ── Unban user ───────────────────────────────────────────────
export const unbanUser = createAsyncThunk("users/unbanUser", async (userId, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`/users/${userId}/unban`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Error unbanning user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ── getUsers ──────────────────────────────
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ── removeUser ────────────────────────────
      .addCase(removeUser.fulfilled, (state, action) => {
        // action.payload = the userId that was deleted
        state.list = state.list.filter((user) => user.id !== action.payload);
      })

      // ── banUser ───────────────────────────────
      // Finds the user in state.list and replaces them with updated object
      .addCase(banUser.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.list.findIndex((u) => u.id === updated.id);
        if (idx !== -1) state.list[idx] = updated;
      })

      // ── unbanUser ─────────────────────────────
      .addCase(unbanUser.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.list.findIndex((u) => u.id === updated.id);
        if (idx !== -1) state.list[idx] = updated;
      });
  },
});

export default userSlice.reducer;