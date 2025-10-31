import axiosInstance from "../../services/axiosInstance";

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users"); // 🔹 backend: GET /api/users
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`); // 🔹 backend: DELETE /api/users/{id}
  return response.data;
};
