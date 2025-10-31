// src/components/TicketCard.jsx
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ booking, onDownload }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h5>{booking.busDetails.busName}</h5>
        <span>{new Date(booking.bookingTime).toLocaleDateString()}</span>
      </div>
      <div className="ticket-body">
        <p><strong>From:</strong> {booking.busDetails.startLocation}</p>
        <p><strong>To:</strong> {booking.busDetails.endLocation}</p>
        <p><strong>Seats:</strong> {booking.seatNumbers.join(', ')}</p>
        <p><strong>Fare:</strong> ₹{booking.totalFare}</p>
        <p><strong>Status:</strong> Confirmed</p>
      </div>
      <div className="ticket-actions">
        <button className="btn btn-primary" onClick={() => onDownload(booking.id)}>Download Ticket</button>
      </div>
    </div>
  );
};

export default TicketCard;
