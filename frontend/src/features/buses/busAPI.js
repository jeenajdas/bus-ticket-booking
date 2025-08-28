// src/features/buses/busAPI.js
import axiosInstance from "../../services/axiosInstance";

// ✅ Dashboard counts
export const getBusCount = async () => {
  const res = await axiosInstance.get("/admin/buses");
  return res.data;
};

// ✅ Fetch all bus routes
export const fetchBuses = async () => {
  const res = await axiosInstance.get("/bus-routes/all"); // should exist in BusRouteController
  return res.data;
};

// ✅ Add a new bus
export const createBus = async (busData) => {
  const res = await axiosInstance.post("/admin/bus-routes", busData);
  return res.data;
};

// ✅ Update a bus
export const editBus = async ({ id, updatedData }) => {
  const res = await axiosInstance.put(`/admin/bus-routes/${id}`, updatedData);
  return res.data;
};

// ✅ Delete a bus
export const removeBus = async (id) => {
  await axiosInstance.delete(`/admin/bus-routes/${id}`);
  return id;
};

// ✅ Disable a bus
export const disableBus = async (id) => {
  const res = await axiosInstance.put(`/admin/bus-routes/disable/${id}`);
  return res.data;
};
// ✅ Toggle active/inactive bus status
export const toggleBusStatus = async (id) => {
  const res = await axiosInstance.put(`/admin/bus-routes/toggle/${id}`);
  return res.data;
};


// ✅ User-side search
export const searchBusRoutes = async ({ from, to, date }) => {
  const response = await axiosInstance.get("/bus-routes/search", {
    params: {
      startLocation: from,
      endLocation: to,
      departureTime: date ? `${date}T00:00:00` : undefined,
    },
  });
  return response.data;
};
