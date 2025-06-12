import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "../components/Tickets/SelectSeatsPage.css";
import { FaWheelchair } from "react-icons/fa";

const seats = [
  ["B1", "B3", "B5", "B7", "B9", "B11", "B13", "B15", "B17", "B19"],
  ["B2", "B4", "B6", "B8", "B10", "B12", "B14", "B16", "B18", ""],
  ["A1", "A3", "A5", "A7", "A9", "A11", "A13", "A15", "A17", ""],
  ["A2", "A4", "A6", "A8", "A10", "A12", "A14", "A16", "A18", ""],
];

const SelectSeatsPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.token);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ✅ Restore pending booking (if redirected after login)
  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingBooking"));
    if (pending?.busId === busId) {
      setSelectedSeats(pending.selectedSeats || []);
      localStorage.removeItem("pendingBooking"); // clear it after restoring
    }
  }, [busId]);

  // ✅ Fetch booked seats from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`/api/bookings/booked-seats`, {
          params: { busId, date: today },
        });
        setBookedSeats(response.data);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };
    fetchBookedSeats();
  }, [busId]);

  const isBooked = (seat) => bookedSeats.includes(seat);

  const handleSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 6) {
        setShowLimitPopup(true);
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="select-page-container">
      {/* Hero Banner */}
      <div className="select-hero">
        <div className="select-hero-content">Bus Details</div>
      </div>

      <div>Seat Selection for Bus ID: {busId}</div>
      <div className="select-curve-divider"></div>

      {/* Main Content Layout */}
      <div className="select-seats-wrapper">
        {/* Seat Layout Section */}
        <div className="select-seat-layout">
          <div className="d-flex align-items-center mb-3">
            <FaWheelchair className="me-2 text-danger" />
            <span>Click on available seats to reserve your seat.</span>
          </div>

          {seats.map((row, rowIndex) => (
            <div className="select-seat-row" key={rowIndex}>
              {row.map((seat, seatIndex) =>
                seat ? (
                  <div
                    key={seatIndex}
                    className={`select-seat ${
                      isBooked(seat)
                        ? "select-booked"
                        : selectedSeats.includes(seat)
                        ? "select-selected"
                        : "select-available"
                    }`}
                    onClick={() => !isBooked(seat) && handleSelect(seat)}
                  >
                    <div className="select-seat-label">{seat}</div>
                  </div>
                ) : (
                  <div
                    className="select-seat"
                    style={{ visibility: "hidden" }}
                    key={seatIndex}
                  ></div>
                )
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="select-legend">
            <div className="d-flex align-items-center gap-2">
              <div className="select-legend-box select-booked-box"></div>
              <span>Booked</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="select-legend-box select-selected-box"></div>
              <span>Selected</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="select-legend-box select-available-box"></div>
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Checkout Panel */}
        <div className="select-info-panel">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Your Destination</h5>
            <a href="#" className="text-danger">Change route</a>
          </div>

          <div className="select-price-details">
            <p><strong>From:</strong> Kathmandu (06:15 pm)</p>
            <p><strong>To:</strong> Pyuthan (08:45 am)</p>
          </div>

          <div className="my-3">
            <strong>Selected Seats:</strong>
            <div className="mt-2">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <span className="select-seat-pill" key={seat}>{seat}</span>
                ))
              ) : (
                <span className="text-muted">No seats selected</span>
              )}
            </div>
          </div>

          <div className="select-price-details">
            <p><strong>Basic Fare:</strong> NPR. 1600</p>
            <p><strong>Total Price:</strong> NPR {selectedSeats.length * 1600}</p>
          </div>

          <button
            className="select-checkout-btn w-100"
            onClick={() => {
              if (!isLoggedIn) {
                // ✅ Save pending booking to localStorage
                localStorage.setItem("pendingBooking", JSON.stringify({
                  busId,
                  selectedSeats,
                  fare: 1600, // or dynamically from props/state
                  from: "Kathmandu",
                  to: "Pyuthan",
                  date: new Date().toISOString().split('T')[0],
                }));
                setShowLoginPopup(true);
              } else {
                // ✅ Proceed to booking/checkout logic
                console.log("Booking seats:", selectedSeats);
                // navigate("/checkout") or API call
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      {/* Seat Limit Popup */}
      {showLimitPopup && (
        <div className="seat-limit-popup">
          <div className="seat-limit-popup-content">
            <p>⚠️ You can only book a maximum of 6 seats.</p>
            <button onClick={() => setShowLimitPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="seat-limit-popup">
          <div className="seat-limit-popup-content">
            <p>⚠️ You need to log in to book tickets.</p>
            <button onClick={() => navigate("/signin")}>Login Now</button>
            <button className="ms-2" onClick={() => setShowLoginPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSeatsPage;
