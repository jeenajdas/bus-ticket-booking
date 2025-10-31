// src/pages/ResetPassword.jsx

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import axiosInstance from '../services/axiosInstance';


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/reset-password', { token, newPassword });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error resetting password.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form fade-in" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Reset Password</button>
        {message && <p className="mt-3 text-info">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
