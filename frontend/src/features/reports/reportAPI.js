// src/features/reports/reportAPI.js
import axiosInstance from '../../services/axiosInstance';

// Get total revenue (all buses, all time)
export const getTotalCollection = async () => {
  const res = await axiosInstance.get('/admin/report/total-collection');
  return res.data; // returns a number
};

// Get revenue for a specific bus
export const getCollectionByBus = async (busId) => {
  const res = await axiosInstance.get(`/admin/report/collection/${busId}`);
  return res.data; // returns a number
};
