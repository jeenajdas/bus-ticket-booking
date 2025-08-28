// src/pages/admin/Bookings.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../features/bookings/bookingSlice';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading bookings...</p>;
  if (status === 'failed') return <p>Failed to load bookings</p>;

  return (
    <div className="container-fluid p-3">
      <h3 className="mb-3">All Bookings</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Bus</th>
            <th>Seats</th>
            <th>Date</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user?.name || "N/A"}</td>
              <td>{b.bus?.busName || "N/A"}</td>
              <td>{b.seats?.join(", ")}</td>
              <td>{b.date}</td>
              <td>₹{b.totalFare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
