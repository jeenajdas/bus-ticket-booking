// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import busReducer from '../features/buses/busSlice'
import bookingReducer from '../features/bookings/bookingSlice'
import reportReducer from '../features/reports/reportSlice'
import userBusReducer from '../features/buses/userBusSlice'
import userBookingReducer from '../features/bookings/userBookingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
    bookings: bookingReducer,
    reports: reportReducer,
    userBuses: userBusReducer,
    userBooking: userBookingReducer,
  },
});

export default store;
