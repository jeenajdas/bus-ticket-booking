// src/features/profile/profileAPI.js

import axiosInstance from "../../services/axiosInstance";

// GET /api/users/profile
export const fetchProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

// PUT /api/users/profile  — updates name, email, phone
export const updateProfile = async (profile) => {
  const response = await axiosInstance.put("/users/profile", profile);
  return response.data;
};

// ✅ NEW — PUT /api/users/change-password
// Add this endpoint to your Spring Boot backend too (see note below)
export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await axiosInstance.put("/users/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};