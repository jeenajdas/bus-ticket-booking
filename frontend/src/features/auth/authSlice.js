// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAPI';

export const signUp = createAsyncThunk('auth/signUp', async (user, thunkAPI) => {
  try {
    return await registerUser(user);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
  }
});

export const signIn = createAsyncThunk('auth/signIn', async ({ credentials, navigate }, thunkAPI) => {
  try {
    const data = await loginUser({ credentials });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);

    // 🧠 Restore previous intent
    const pending = JSON.parse(localStorage.getItem('pendingBooking'));
    if (pending?.busId && data.role !== 'ADMIN') {
      navigate(`/select-seats/${pending.busId}`);
    } else if (data.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      // SignUp
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // SignIn
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
