import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this

const BusList = ({ buses = [] }) => {
  const navigate = useNavigate(); // ✅ useNavigate hook

  if (!buses.length) {
    return <p>No buses found. Try a different route or date.</p>;
  }

  const handleSelectSeats = (busId) => {
    navigate(`/select-seats/${busId}`);
  };

  return (
    <div className="bus-list">
      {buses.map((bus, index) => (
        <div key={index} className="card mb-3 p-3">
          <h5>{bus.busName}</h5>
          <p>{bus.busType} - {bus.seatType}</p>
          <p>
            {new Date(bus.startDateTime).toLocaleTimeString()} → {new Date(bus.endDateTime).toLocaleTimeString()} 
            <span className="mx-3">₹{bus.fare}</span>
          </p>
          <button
            className="btn btn-warning"
            onClick={() => handleSelectSeats(bus.id)} // ✅ navigate to seat selection
          >
            Select Seats
          </button>
        </div>
      ))}
    </div>
  );
};

export default BusList;
