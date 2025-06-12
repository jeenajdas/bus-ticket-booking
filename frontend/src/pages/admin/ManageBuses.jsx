import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, deleteBus, disableBus } from '../features/bus/busSlice';

const ManageBuses = () => {
  const dispatch = useDispatch();
  const { buses } = useSelector((state) => state.bus);

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBus(id));
  };

  const handleDisable = (id) => {
    dispatch(disableBus(id));
  };

  return (
    <div className="p-4">
      <h2>Manage Buses</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Date & Time</th>
            <th>Seats</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id}>
              <td>{bus.startLocation} → {bus.endLocation}</td>
              <td>{bus.startTime} to {bus.endTime}</td>
              <td>{bus.availableSeats}</td>
              <td>{bus.fare}</td>
              <td>
                <button onClick={() => handleDisable(bus.id)}>Disable</button>
                <button onClick={() => handleDelete(bus.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBuses;
