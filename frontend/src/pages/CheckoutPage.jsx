import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../services/axiosInstance';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSeats, busDetails, date } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [passengers, setPassengers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedSeats?.length > 0) {
      setPassengers(selectedSeats.map(() => ({ name: '', age: '', gender: '' })));
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

  const handleProceedToPay = async () => {
    setHasSubmitted(true);

    if (!user || !token) {
      alert("Please login to proceed.");
      return;
    }

    // Validate passengers
    const isValid = passengers.every(p => p.name.trim() && p.age > 0 && p.gender);
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Step 1: Create Razorpay order from backend
      const orderRes = await axiosInstance.post('/payment/create-order',
        { amount: finalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency, keyId } = orderRes.data;

      // Step 2: Open Razorpay payment popup
      const options = {
        key: keyId,
        amount: amount * 100,
        currency,
        name: "EasyTrip",
        description: `Bus Ticket - ${busDetails?.startLocation} to ${busDetails?.endLocation}`,
        order_id: orderId,

        handler: async function (response) {
          // Step 3: Payment done — verify and create booking
          try {
            const verifyRes = await axiosInstance.post('/payment/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              bookingData: {
                busId: busDetails?.id,
                seatNumbers: selectedSeats,
                passengers,
                totalFare: finalAmount,
                travelDate: date,
              }
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            // Step 4: Navigate to success page
            navigate("/booking-success", {
              state: {
                bookingId: verifyRes.data.bookingId,
                bookingData: {
                  busDetails,
                  seatNumbers: selectedSeats,
                  passengers,
                  totalFare: finalAmount,
                },
              },
            });

          } catch (err) {
            alert("Payment verified but booking failed. Please contact support.");
            setIsLoading(false);
          }
        },

        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },

        theme: { color: "#6366f1" },

        modal: {
          ondismiss: function () {
            // User closed the popup without paying
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary">Checkout</h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </motion.div>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-blue-50 border-l-4 border-primary p-4 mb-8 text-primary shadow-sm">
            <p className="font-medium text-center">Opening payment window...</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h5 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-accent mr-3 rounded-full" />
                Contact Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-slate-900">{user?.phone || 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-slate-900">{user?.email || 'N/A'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h5 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-accent mr-3 rounded-full" />
                Passenger Details
              </h5>
              <div className="space-y-6">
                {selectedSeats?.map((seat, index) => (
                  <div key={seat} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-xl">
                    <div className="md:col-span-2">
                      <span className="inline-block bg-primary text-white font-bold px-4 py-2 rounded-lg w-full text-center">{seat}</span>
                    </div>
                    <div className="md:col-span-4">
                      <input type="text"
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none ${hasSubmitted && !passengers[index]?.name.trim() ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        placeholder="Full Name"
                        value={passengers[index]?.name || ''}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input type="number"
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none ${hasSubmitted && (!passengers[index]?.age || passengers[index]?.age <= 0) ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        placeholder="Age"
                        value={passengers[index]?.age || ''}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <select
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary outline-none bg-white ${hasSubmitted && !passengers[index]?.gender ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
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
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4">
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h5 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-accent mr-3 rounded-full" />
                Fare Summary
              </h5>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">From</span>
                  <span className="font-semibold">{busDetails?.startLocation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">To</span>
                  <span className="font-semibold">{busDetails?.endLocation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seats</span>
                  <span className="font-semibold">{selectedSeats?.join(', ')}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Total</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST (5%)</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl mb-8 border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-extrabold text-primary">₹{finalAmount}</span>
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-primary hover:bg-primary-light text-white'}`}
                onClick={handleProceedToPay}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Proceed to Pay"}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;