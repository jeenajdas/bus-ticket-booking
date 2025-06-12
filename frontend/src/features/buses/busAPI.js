import axiosInstance from '../../services/axiosInstance';

export const getAllBuses = async () => {
  const res = await axiosInstance.get('/admin/buses');
  return res.data;
};

export const createBus = async (busData) => {
  const res = await axiosInstance.post('/admin/buses', busData);
  return res.data;
};

export const editBus = async ({ id, updatedData }) => {
  const res = await axiosInstance.put(`/admin/buses/${id}`, updatedData);
  return res.data;
};

export const removeBus = async (id) => {
  await axiosInstance.delete(`/admin/buses/${id}`);
  return id;
};

export const disableBus = async (id) => {
  const res = await axiosInstance.patch(`/admin/buses/${id}/disable`);
  return res.data;
};

// ✅ User-side: Search for available bus routes
export const searchBusRoutes = async ({ from, to, date }) => {
  const response = await axiosInstance.get('/bus-routes/search', {
    params: {
      startLocation: from,
      endLocation: to,
      departureTime: date ? `${date}T00:00:00` : undefined,
    },
  });
  return response.data;
};

