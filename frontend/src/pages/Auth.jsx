// src/pages/Auth.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';
import axiosInstance from '../services/axiosInstance';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [isSignUp, setIsSignUp] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', phone: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData));
    } else {
      dispatch(signIn({ credentials: formData, navigate }));
    }
  };

  // 🔹 Forgot Password Request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
     const res = await axiosInstance.post('/auth/forgot-password', { email: forgotEmail });

      setForgotMessage(res.data.message);
    } catch (err) {
      setForgotMessage(err.response?.data?.error || 'Error sending reset link.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form fade-in" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

        {isSignUp && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isSignUp && (
          <p
            className="text-primary mb-2"
            style={{ cursor: 'pointer', textAlign: 'right', fontSize: '14px' }}
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </p>
        )}

        <button type="submit" disabled={authStatus === 'loading'}>
          {authStatus === 'loading'
            ? 'Please wait...'
            : isSignUp
            ? 'Sign Up'
            : 'Login'}
        </button>

        {authError && <p className="error-message">{authError}</p>}

        <p className="switch-mode">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="switch-text" onClick={toggleMode}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>

      {/* 🔹 Forgot Password Popup */}
      {showForgot && (
        <div className="forgot-popup fade-in">
          <div className="forgot-box">
            <h4>Reset your password</h4>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="form-control mb-3"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button className="btn btn-success w-100" type="submit">
                Send Reset Link
              </button>
            </form>
            {forgotMessage && <p className="mt-2 text-info">{forgotMessage}</p>}
            <p
              className="text-danger mt-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowForgot(false)}
            >
              Close
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
