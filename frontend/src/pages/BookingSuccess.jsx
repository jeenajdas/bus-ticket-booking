import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBus, FaCalendarAlt, FaClock, FaChair, FaUsers, FaArrowRight, FaHome } from 'react-icons/fa';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.bookingData;
  const bookingId = location.state?.bookingId;
  const busDetails = booking?.busDetails;

  if (!booking || !bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[48px] shadow-2xl text-center space-y-8 max-w-sm">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <FaCheckCircle size={40} className="rotate-180" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 uppercase italic">Invalid Access</h4>
            <p className="text-sm font-medium text-slate-400">No booking data found in the current session.</p>
          </div>
          <button
            className="w-full bg-primary text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:bg-slate-900"
            onClick={() => navigate('/')}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -ml-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="bg-white rounded-[64px] overflow-hidden shadow-2xl">
          {/* Celebration Header */}
          <div className="bg-accent p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <FaBus size={200} className="-rotate-12 translate-x-12 translate-y-12" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl text-primary relative z-10"
            >
              <FaCheckCircle size={48} />
            </motion.div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter leading-none mb-2">Booking Established!</h2>
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">Confirmation ID: <span className="text-primary">{bookingId}</span></p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-10 md:p-12 space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Departure</p>
                <p className="text-lg font-black text-slate-900 uppercase italic leading-none">{booking?.busDetails?.startLocation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                <p className="text-lg font-black text-slate-900 uppercase italic leading-none">{booking?.busDetails?.endLocation}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              <div className="space-y-2">
                <FaCalendarAlt className="text-accent" />
                <p className="text-[10px] font-black text-slate-900 uppercase">{new Date(busDetails.startDateTime).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2 text-center">
                <FaClock className="text-accent mx-auto" />
                <p className="text-[10px] font-black text-slate-900 uppercase">
                  {new Date(busDetails.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
              <div className="space-y-2 text-right">
                <FaChair className="text-accent ml-auto" />
                <p className="text-[10px] font-black text-slate-900 uppercase">Seats: {booking?.seatNumbers?.join(', ')}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <FaUsers size={12} className="text-accent" />
                Manifested Passengers
              </div>
              <ul className="space-y-2">
                {booking?.passengers?.map((p, i) => (
                  <li key={i} className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{p.name} <span className="opacity-40 uppercase text-[9px]">({p.gender})</span></span>
                    <span className="opacity-40 text-[10px]">AGE {p.age}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center bg-primary p-6 rounded-3xl text-white shadow-xl shadow-primary/10">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Fare Settled</span>
              <span className="text-2xl font-black italic tracking-tighter text-accent italic">₹{booking?.totalFare}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                  onClick={() => navigate('/my-bookings')}
                >
                  Archived Bookings
                </button>
                <button
                  className="bg-accent text-primary font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-accent-dark transition-all active:scale-95 shadow-xl shadow-accent/20"
                  onClick={() => navigate(`/ticket/${bookingId}`)}
                >
                  Digital Ticket <FaArrowRight size={10} />
                </button>
              </div>
              <button
                className="w-full text-slate-400 font-black uppercase tracking-widest text-[9px] py-4 flex items-center justify-center gap-2 hover:text-primary transition-colors"
                onClick={() => navigate('/')}
              >
                <FaHome size={12} /> Return to Primary Hub
              </button>
            </div>
          </div>
        </div>
        <p className="text-center mt-10 text-white/30 text-[9px] font-black uppercase tracking-[0.4em]">Transaction Finalized • Confirmation Email Dispatched</p>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
