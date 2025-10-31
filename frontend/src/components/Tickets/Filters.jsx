// src/components/Tickets/Filters.jsx
import React from 'react';
import './Tickets.css';

const Filters = () => {
  return (
    <div className="filters p-3 shadow rounded bg-white">
      <h5 className="mb-3">Filters</h5>

      {/* Departure Time Filter */}
      <div className="mb-4">
        <h6>Departure Time</h6>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="morning" />
          <label className="form-check-label" htmlFor="morning">Morning (5am - 12pm)</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="afternoon" />
          <label className="form-check-label" htmlFor="afternoon">Afternoon (12pm - 5pm)</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="evening" />
          <label className="form-check-label" htmlFor="evening">Evening (5pm - 9pm)</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="night" />
          <label className="form-check-label" htmlFor="night">Night (9pm - 5am)</label>
        </div>
      </div>

      {/* Bus Type Filter */}
      <div className="mb-4">
        <h6>Bus Type</h6>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ac" />
          <label className="form-check-label" htmlFor="ac">AC</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="nonac" />
          <label className="form-check-label" htmlFor="nonac">Non-AC</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="sleeper" />
          <label className="form-check-label" htmlFor="sleeper">Sleeper</label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h6>Price Range</h6>
        <input type="range" className="form-range" min="100" max="2000" />
      </div>
    </div>
  );
};

export default Filters;
