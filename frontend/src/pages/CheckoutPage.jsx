// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import { bookSeats } from '../features/bookings/userBookingSlice';

import './CheckoutPage.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, busDetails } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [passengers, setPassengers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (selectedSeats?.length > 0) {
      const init = selectedSeats.map(() => ({ name: '', age: '', gender: '' }));
      setPassengers(init);
    }
  }, [selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const totalAmount = selectedSeats?.length * (busDetails?.fare || 0);
  const taxes = Math.round(totalAmount * 0.05);
  const finalAmount = totalAmount + taxes;

  const handleProceedToPay = () => {
  

    setHasSubmitted(true);

    if (!user || !token) {
      alert("Please login to proceed.");
      return;
    }

    let isValid = true;
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim() || !p.age || p.age <= 0 || !p.gender) {
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    const bookingData = {
      busId: busDetails?.id,
      seatNumbers: selectedSeats,
      passengers,
      totalFare: finalAmount,
    };

    dispatch(bookSeats({ bookingData, token }))

  .unwrap()
  .then((res) => {
    console.log("🔎 busDetails:", busDetails); 
  navigate('/booking-success', {
  state: {
    bookingId: res.bookingId,
    bookingData: {
      busDetails,
      seatNumbers: selectedSeats,
      passengers,
      totalFare: finalAmount,
    },
  },
});
  });
  }

  return (
    <div className="checkout-container container py-5">
      {/* Banner */}
      <div className="checkout-banner text-center animate__animated animate__fadeInDown">
        <h2>Checkout</h2>
      </div>

      <div className="row mt-5 gy-4">
        {/* Left Panel */}
        <div className="col-lg-8 animate__animated animate__fadeInLeft">
          {/* Contact Details */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">Contact Details</h5>
            <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          </div>

          {/* Passenger Details */}
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Passenger Details</h5>
            {selectedSeats?.map((seat, index) => (
              <div className="row g-3 mb-3 align-items-center" key={seat}>
                <div className="col-md-2">
                  <span className="badge bg-primary py-2 px-3">{seat}</span>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    required
                    className={`form-control ${hasSubmitted && !passengers[index]?.name.trim() ? 'is-invalid' : ''}`}
                    placeholder="Name"
                    value={passengers[index]?.name || ''}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    required
                    className={`form-control ${hasSubmitted && (!passengers[index]?.age || passengers[index]?.age <= 0) ? 'is-invalid' : ''}`}
                    placeholder="Age"
                    value={passengers[index]?.age || ''}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    required
                    className={`form-select ${hasSubmitted && !passengers[index]?.gender ? 'is-invalid' : ''}`}
                    value={passengers[index]?.gender || ''}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-lg-4 animate__animated animate__fadeInRight">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Fare Summary</h5>
            <p><strong>From:</strong> {busDetails?.startLocation}</p>
            <p><strong>To:</strong> {busDetails?.endLocation}</p>
            <p><strong>Seats:</strong> {selectedSeats?.join(', ')}</p>
            <p><strong>Fare per Seat:</strong> ₹{busDetails?.fare}</p>
            <p><strong>Base Total:</strong> ₹{totalAmount}</p>
            <p><strong>GST (5%):</strong> ₹{taxes}</p>
            <hr />
            <h5>Total Amount Payable: ₹{finalAmount}</h5>
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={handleProceedToPay}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
