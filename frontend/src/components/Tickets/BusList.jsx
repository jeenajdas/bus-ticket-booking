import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaBolt, FaInfoCircle } from 'react-icons/fa';

const BusList = ({ buses = [], date }) => {
  const navigate = useNavigate();

  if (!buses.length) {
    return (
      <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center">
        <p className="text-gray-400 font-bold">No buses found. Try a different route or date.</p>
      </div>
    );
  }

  const handleSelectSeats = (busId) => {
    navigate(`/select-seats/${busId}`, {
      state: { date }
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="grid gap-6">
      {buses.map((bus, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-accent/10 transition-colors" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            {/* Bus Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {bus.busType}
                </span>
                <span className="bg-accent/20 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full flex items-center gap-1">
                  <FaBolt size={8} /> {bus.seatType}
                </span>
              </div>
              <h5 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">
                {bus.busName}
              </h5>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <FaInfoCircle size={14} className="text-accent" />
                <span>On-time reliability: 98%</span>
              </div>
            </div>

            {/* Timings & Price */}
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              <div className="flex items-center gap-8 text-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Departure</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">{new Date(bus.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-px bg-gray-100 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <p className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">Direct</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Arrival</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">{new Date(bus.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              <div className="text-center md:text-right min-w-[100px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Fare</p>
                <div className="flex items-baseline justify-center md:justify-end gap-1">
                  <span className="text-sm font-black text-slate-900">₹</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter italic">{bus.fare}</span>
                </div>
              </div>

              <button
                className="bg-primary text-white font-black uppercase tracking-widest px-8 py-5 rounded-[24px] hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-primary/20"
                onClick={() => handleSelectSeats(bus.id)}
              >
                <span>Book Seats</span>
                <FaChevronRight size={14} className="text-accent" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BusList;