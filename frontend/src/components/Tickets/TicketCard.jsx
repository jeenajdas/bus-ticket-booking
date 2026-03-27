import React from 'react';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaDownload } from 'react-icons/fa';

const TicketCard = ({ booking, onDownload }) => {
  return (
    <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl relative group">
      {/* Decorative pass cutout effect */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-12 bg-gray-50 rounded-r-full border-r border-y border-gray-100" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-12 bg-gray-50 rounded-l-full border-l border-y border-gray-100" />
      <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 h-px border-t-2 border-dashed border-gray-100" />

      {/* Top Section */}
      <div className="p-8 pb-12">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
              <FaBus size={20} />
            </div>
            <div>
              <h5 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{booking.busDetails.busName}</h5>
              <p className="text-[10px] font-black text-accent uppercase tracking-widest">{booking.busDetails.busType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Travel Date</p>
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <FaCalendarAlt size={12} className="text-accent" />
              <span className="text-sm">{new Date(booking.bookingTime).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">From</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-tight">
              <FaMapMarkerAlt size={12} className="text-primary/30" />
              <span>{booking.busDetails.startLocation}</span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">To</p>
            <div className="flex items-center justify-end gap-2 text-slate-900 font-bold uppercase tracking-tight">
              <span>{booking.busDetails.endLocation}</span>
              <FaMapMarkerAlt size={12} className="text-accent/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-8 pt-12 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Seats</p>
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <FaTicketAlt size={12} className="text-accent" />
              <span className="text-lg">{booking.seatNumbers.join(', ')}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200 hidden md:block" />
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Total Fare</p>
            <div className="flex items-baseline gap-1 text-slate-900 font-black">
              <span className="text-xs">₹</span>
              <span className="text-2xl italic">{booking.totalFare}</span>
            </div>
          </div>
        </div>

        <button
          className="w-full md:w-auto bg-primary hover:bg-slate-900 text-white font-black uppercase tracking-widest px-8 py-4 rounded-3xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 active:scale-95 group/btn"
          onClick={() => onDownload(booking.id)}
        >
          <FaDownload size={14} className="text-accent group-hover/btn:animate-bounce" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
