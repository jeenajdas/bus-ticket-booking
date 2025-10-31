import React, { useState } from 'react';
import '../styles/HeroSection.css';
import Navbar from './Navbar';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert('Please fill in all fields');
      return;
    }
    navigate(`/tickets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  };

  return (
    <div className="hero-section">
      <img src="/final_heroBanner.webp" alt="Bus background" className="hero-bg-img" />
      <Navbar />
      <div className="hero-content">
        <div className="text-area animate-fade">
          <h1 className="text-shadow">
            <span>EasyTrip</span>
          </h1>
          <p className="text-shadow">
            Book your bus tickets effortlessly with real-time availability and instant confirmation.
          </p>
        </div>
      </div>

      <div className="search-container animate-fade delay-2">
        <div className="search-box">
          <div className="form-box">
            <FaMapMarkerAlt className="form-icon" />
            <input type="text" placeholder="Select location" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="form-box">
            <FaLocationArrow className="form-icon" />
            <input type="text" placeholder="Select destination" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="form-box">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
