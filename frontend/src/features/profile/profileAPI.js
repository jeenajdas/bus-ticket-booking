import axiosInstance from "../../services/axiosInstance";

export const fetchProfile = async () => {
  const response = await axiosInstance.get("/users/profile"); // 🔹 backend: GET /api/users/profile
  return response.data;
};

export const updateProfile = async (profile) => {
  const response = await axiosInstance.put("/users/profile", profile); // 🔹 backend: PUT /api/users/profile
  return response.data;
};
