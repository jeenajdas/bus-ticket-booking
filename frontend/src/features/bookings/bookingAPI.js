import axiosInstance from '../../services/axiosInstance';

export const getAllBookings = async () => {
  const res = await axiosInstance.get('/admin/bookings');
  return res.data;
};
