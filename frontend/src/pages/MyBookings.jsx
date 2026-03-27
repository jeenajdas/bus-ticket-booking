import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../features/bookings/userBookingSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaChevronRight } from 'react-icons/fa';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">My Bookings</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-4 text-gray-500 font-medium italic">Your upcoming and past journeys at a glance.</p>
        </motion.div>

        {myBookingsStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading your bookings...</p>
          </div>
        )}

        {myBookingsStatus === 'failed' && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl shadow-sm text-center">
            <p className="text-red-700 font-bold">Error: {myBookingsError}</p>
          </div>
        )}

        {myBookingsStatus === 'succeeded' && myBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FaTicketAlt className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't made any bookings yet. Start your journey today!</p>
            <Link to="/" className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-lg hover:shadow-primary/30">
              Search Buses
            </Link>
          </motion.div>
        )}

        {myBookingsStatus === 'succeeded' && myBookings.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {myBookings.map((booking, index) => (
              booking ? (
                <motion.div
                  key={booking.id || index}
                  variants={cardVariants}
                  whileHover={{ y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 group transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <FaBus />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{booking.busName}</p>
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-accent">Confirmed</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-px h-12 bg-gray-100 relative left-2">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-white" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400 font-bold uppercase">From</span>
                            <p className="text-sm font-bold text-slate-900 text-right">{booking.startLocation}</p>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-xs text-gray-400 font-bold uppercase">To</span>
                            <p className="text-sm font-bold text-slate-900 text-right">{booking.endLocation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                            <FaCalendarAlt className="text-primary/50" />
                            {booking.travelDate || "N/A"}
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seats</p>
                          <p className="text-xs font-bold text-slate-900">{booking.seatNumbers?.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Fare</p>
                        <p className="text-xl font-black text-primary">₹{booking.amount}</p>
                      </div>
                      <Link to={`/ticket/${booking.id}`} className="flex items-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 group/btn">
                        View Ticket
                        <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : null
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
