import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from '../services/axiosInstance';
import { useSelector } from "react-redux";
import { FaWheelchair, FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function formatTime(dateTimeStr) {
  if (!dateTimeStr) return "N/A";
  const date = new Date(dateTimeStr);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

const seats = [
  ["B1", "B3", "B5", "B7", "B9", "B11", "B13", "B15", "B17", "B19"],
  ["B2", "B4", "B6", "B8", "B10", "B12", "B14", "B16", "B18", ""],
  ["A1", "A3", "A5", "A7", "A9", "A11", "A13", "A15", "A17", ""],
  ["A2", "A4", "A6", "A8", "A10", "A12", "A14", "A16", "A18", ""],
];

const SelectSeatsPage = () => {
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState("");
  const [selectedDropping, setSelectedDropping] = useState("");
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();
  const travelDate = location.state?.date;

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingBooking"));
    if (pending?.busId === busId) {
      setSelectedSeats(pending.selectedSeats || []);
      setSelectedBoarding(pending.boardingPoint || "");
      setSelectedDropping(pending.droppingPoint || "");
      localStorage.removeItem("pendingBooking");
    }
  }, [busId]);

  useEffect(() => {
    if (!travelDate) return;

    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(`/bookings/booked-seats`, {
          params: { busId, date: travelDate },
        });
        setBookedSeats(response.data);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    fetchBookedSeats();
  }, [busId, travelDate]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`/bus-routes/${busId}`);
        setBusDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch bus details", error);
      }
    };
    fetchBusDetails();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary flex items-center justify-center overflow-hidden">
        <img
          src="/seat.jpg"
          alt="Bus Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Select Your Seat</h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Seats Layout Panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:col-span-8 bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8 p-4 bg-red-50 rounded-2xl text-red-700">
            <FaInfoCircle className="flex-shrink-0" />
            <p className="text-sm font-medium">Click on available seats to reserve your seat (Max 6 seats).</p>
          </div>

          <div className="flex flex-col gap-6 md:gap-10">
            {/* Steering Wheel / Driver Area */}
            <div className="flex justify-end pr-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300">
                <div className="w-2 h-6 bg-gray-400 rounded-full" />
              </div>
            </div>

            {/* Seats Grid */}
            <div className="flex flex-col gap-4 overflow-x-auto pb-4">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className={`flex gap-3 md:gap-4 ${rowIndex === 1 ? 'mb-8' : ''}`}>
                  {row.map((seat, seatIndex) => (
                    seat ? (
                      <motion.button
                        key={seatIndex}
                        whileHover={!isBooked(seat) ? { scale: 1.15 } : {}}
                        whileTap={!isBooked(seat) ? { scale: 0.95 } : {}}
                        onClick={() => !isBooked(seat) && handleSelect(seat)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-xs transition-colors shadow-sm relative group
                          ${isBooked(seat)
                            ? 'bg-red-500 text-white cursor-not-allowed border-none'
                            : selectedSeats.includes(seat)
                              ? 'bg-accent text-slate-900 ring-4 ring-accent/30 border-none'
                              : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-accent hover:text-accent'}
                        `}
                      >
                        {seat}
                        {/* Seat Visual Design */}
                        <div className={`absolute -bottom-1 left-1 right-1 h-1 rounded-full ${isBooked(seat) ? 'bg-red-700' : selectedSeats.includes(seat) ? 'bg-accent-dark' : 'bg-gray-300'}`} />
                      </motion.button>
                    ) : (
                      <div key={seatIndex} className="w-10 h-10 md:w-12 md:h-12 invisible" />
                    )
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-white border-2 border-gray-200" />
                <span className="text-sm font-semibold text-gray-500">Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-accent" />
                <span className="text-sm font-semibold text-gray-500">Selected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-red-500" />
                <span className="text-sm font-semibold text-gray-500">Booked</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info & Checkout Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-8"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-8">
            <div className="flex justify-between items-center">
              <h5 className="font-extrabold text-slate-900 text-xl">Trip Details</h5>
              <button
                onClick={() => navigate("/")}
                className="text-xs font-bold text-red-500 hover:text-red-700 underline uppercase tracking-wider"
              >
                Change Route
              </button>
            </div>

            {busDetails ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs font-bold uppercase">From</span>
                    <span className="text-gray-400 text-xs font-bold uppercase">To</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="font-bold text-slate-900">{busDetails.startLocation}</p>
                      <p className="text-xs text-primary font-medium">{formatTime(busDetails.startDateTime)}</p>
                    </div>
                    <div className="flex-1 px-4 flex items-center">
                      <div className="h-px bg-gray-200 w-full relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{busDetails.endLocation}</p>
                      <p className="text-xs text-primary font-medium">{formatTime(busDetails.endDateTime)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">Boarding Point</label>
                    <select
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 text-slate-900 font-medium"
                      value={selectedBoarding}
                      onChange={(e) => setSelectedBoarding(e.target.value)}
                    >
                      <option value="">Select Boarding Point</option>
                      {busDetails.boardingPoints.map((point, index) => (
                        <option key={index} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">Dropping Point</label>
                    <select
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 text-slate-900 font-medium"
                      value={selectedDropping}
                      onChange={(e) => setSelectedDropping(e.target.value)}
                    >
                      <option value="">Select Dropping Point</option>
                      {busDetails.droppingPoints.map((point, index) => (
                        <option key={index} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-24 bg-gray-100 rounded-2xl" />
                <div className="h-40 bg-gray-100 rounded-2xl" />
              </div>
            )}

            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm font-bold text-slate-700 mb-4">Selected Seats</p>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <motion.span
                        key={seat}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="bg-primary text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        {seat}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">No seats selected</span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-6 rounded-2xl">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Basic Fare</span>
                <span className="font-bold text-slate-900">₹{busDetails?.fare || "0"}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-slate-900 font-extrabold">Total Amount</span>
                <span className="text-2xl font-extrabold text-primary">₹{busDetails?.fare ? selectedSeats.length * busDetails.fare : 0}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!selectedBoarding || !selectedDropping) {
                  alert("Please select both boarding and dropping points.");
                  return;
                }
                if (selectedSeats.length === 0) {
                  alert("Please select at least one seat.");
                  return;
                }

                if (!isLoggedIn) {
                  if (!busDetails) return;
                  localStorage.setItem("pendingBooking", JSON.stringify({
                    busId,
                    selectedSeats,
                    fare: busDetails.fare,
                    from: busDetails.startLocation,
                    to: busDetails.endLocation,
                    boardingPoint: selectedBoarding,
                    droppingPoint: selectedDropping,
                    date: travelDate,
                  }));
                  setShowLoginPopup(true);
                } else {
                  navigate("/checkout", {
                    state: {
                      busId,
                      selectedSeats,
                      busDetails,
                      boardingPoint: selectedBoarding,
                      droppingPoint: selectedDropping,
                      date: travelDate,
                    },
                  });
                }
              }}
              className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-lg"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </motion.div>
      </div>

      {/* Popups */}
      <AnimatePresence>
        {showLimitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaInfoCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Seat Limit Reached</h3>
              <p className="text-gray-500 mb-8 font-medium">You can only book a maximum of 6 seats at once.</p>
              <button
                onClick={() => setShowLimitPopup(false)}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-xl transition-all"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}

        {showLoginPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <FaInfoCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Login Required</h3>
              <p className="text-gray-500 mb-8 font-medium">You need to log in to proceed with your booking.</p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-xl transition-all"
                >
                  Login Now
                </button>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="w-full bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-500 font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectSeatsPage;
