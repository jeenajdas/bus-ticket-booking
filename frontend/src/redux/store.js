// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import busReducer from '../features/buses/busSlice'
import bookingReducer from '../features/bookings/bookingSlice'
import reportReducer from '../features/reports/reportSlice'
import userBusReducer from '../features/buses/userBusSlice'
import userBookingReducer from '../features/bookings/userBookingSlice'
import userReducer        from '../features/users/userSlice'; 
import profileReducer      from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
    bookings: bookingReducer,
    reports: reportReducer,
    userBuses: userBusReducer,
    userBooking: userBookingReducer,
    users: userReducer, 
    profile:   profileReducer, 
  },
});

export default store;
