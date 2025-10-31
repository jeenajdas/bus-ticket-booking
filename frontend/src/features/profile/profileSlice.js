import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "./profileAPI";

export const getProfile = createAsyncThunk("profile/getProfile", async (_, thunkAPI) => {
  try {
    return await fetchProfile();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load profile");
  }
});

export const saveProfile = createAsyncThunk("profile/saveProfile", async (profile, thunkAPI) => {
  try {
    return await updateProfile(profile);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default profileSlice.reducer;
