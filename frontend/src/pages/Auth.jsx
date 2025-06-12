// src/pages/Auth.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; // Optional: Create your own modern styles here

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [isSignUp, setIsSignUp] = useState(true);
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
          <span className='switch-text' onClick={toggleMode}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
