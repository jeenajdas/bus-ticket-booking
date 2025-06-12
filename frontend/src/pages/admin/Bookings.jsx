import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../features/booking/bookingSlice';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Bus</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.userEmail}</td>
              <td>{b.busName}</td>
              <td>{b.date}</td>
              <td>{b.seats}</td>
              <td>₹{b.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
