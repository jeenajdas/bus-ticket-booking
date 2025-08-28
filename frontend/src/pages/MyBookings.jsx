import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../features/bookings/userBookingSlice';
import './MyBookings.css';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const {
    myBookings,
    myBookingsStatus,
    myBookingsError,
  } = useSelector((state) => state.userBooking);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserBookings(token));
    }
  }, [dispatch, token]);

//   const handleDownload = async (bookingId) => {
//   try {
//     const response = await fetch(`/api/bookings/download-ticket/${bookingId}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `ticket-${bookingId}.pdf`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Download failed", error);
//   }
// };

  return (
    <div className="my-bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      {myBookingsStatus === 'loading' && <p className="loading-text">Loading your bookings...</p>}
      {myBookingsStatus === 'failed' && (
        <p className="error-text">Error: {myBookingsError}</p>
      )}
      {myBookingsStatus === 'succeeded' && myBookings.length === 0 && (
        <p className="no-bookings-text">You have no previous bookings.</p>
      )}

      {myBookingsStatus === 'succeeded' && myBookings.length > 0 && (
        <div className="bookings-grid">
          {myBookings.map((booking, index) => (
  booking ? (
    <div className="booking-card" key={booking.bookingId || booking.id || index}>
      <div className="booking-info">
        <p><strong>From:</strong> {booking.busRoute?.startLocation}</p>
<p><strong>To:</strong> {booking.busRoute?.endLocation}</p>
<p><strong>Date:</strong> {new Date(booking.busRoute?.startDateTime).toLocaleDateString()}</p>

        <p><strong>Seats:</strong> {booking.seatNumbers?.join(', ')}</p>
        <p><strong>Fare:</strong> ₹{booking.totalFare}</p>
      </div>
      <Link to={`/ticket/${booking.bookingId}`}>
  <button className="download-btn">
    View Ticket
  </button>
</Link>
    </div>
  ) : null
))}

        </div>
      )}
    </div>
  );
};

export default MyBookings;
