// src/features/auth/authAPI.js
import axiosInstance from '../../services/axiosInstance';

export const registerUser = async (user) => {
  const response = await axiosInstance.post('/auth/register', user);
  return response.data;
};

export const loginUser = async ({ credentials }) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

