import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.bookingData;
  const bookingId = location.state?.bookingId;
  const busDetails = booking?.busDetails;

  if (!booking || !bookingId) {
    // fallback in case user directly visits the page
    return (
      <div className="text-center mt-5">
        <h4>Invalid Access</h4>
        <p>No booking data found. Please go to home.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="booking-success-wrapper">
      <h2 className="booking-success-heading">🎉 Booking Successful!</h2>
      <p>You have successfully booked your bus ticket.</p>
      <h4 className="booking-success-subheading">Booking ID: {bookingId}</h4>

      <div className="booking-success-details mt-4 text-start">
        <p><strong>From:</strong> {booking?.busDetails?.startLocation}</p>
        <p><strong>To:</strong> {booking?.busDetails?.endLocation}</p>
        <p><strong>
   Date:</strong> {new Date(busDetails.startDateTime).toLocaleDateString()}
</p>

       <p><strong>
  Departure Time:</strong> {new Date(busDetails.startDateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}</p>
        <p><strong>Bus Type:</strong> {booking?.busDetails?.busType}</p>
        <p><strong>Seat Numbers:</strong> {booking?.seatNumbers?.join(', ')}</p>
        <p><strong>Passengers:</strong></p>
        <ul>
          {booking?.passengers?.map((p, i) => (
            <li key={i}>
              {p.name} ({p.gender}, Age {p.age})
            </li>
          ))}
        </ul>
        <p><strong>Total Fare Paid:</strong> ₹{booking?.totalFare}</p>
      </div>

      <p className="mt-4">📧 You will receive a confirmation email shortly with your ticket details.</p>

      <div className="booking-success-buttons">
        <button className="booking-success-btn primary" onClick={() => navigate('/my-bookings')}>
          View My Bookings
        </button>
        <button
          className="booking-success-btn primary"
          onClick={() => navigate(`/ticket/${bookingId}`)}
        >
          View Ticket
        </button>
        <button className="booking-success-btn secondary" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
