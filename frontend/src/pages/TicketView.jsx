import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'react-qr-code';
import axiosInstance from '../services/axiosInstance';
import { motion } from 'framer-motion';
import { FaBus, FaCalendarAlt, FaClock, FaIdCard, FaMapMarkerAlt, FaTicketAlt, FaDownload, FaArrowLeft } from 'react-icons/fa';

const TicketView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const ticketRef = useRef();

  useEffect(() => {
    axiosInstance
      .get(`/bookings/view/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => setBooking(res.data))
      .catch(console.error);
  }, [bookingId]);

  const downloadPDF = () => {
    html2canvas(ticketRef.current, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`ticket_${bookingId}.pdf`);
    });
  };

  if (!booking) return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center space-y-8">
      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-2xl">
        <FaTicketAlt size={32} className="text-primary" />
      </div>
      <p className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic animate-pulse">Retrieving Secure Pass...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-xl mx-auto space-y-12">
        {/* Navigation / Header */}
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary hover:text-accent transition-colors active:scale-95"
          >
            <FaArrowLeft />
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Digital <span className="text-primary italic">Boarding Pass</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ID: {booking.id}</p>
          </div>
        </div>

        {/* Digital Pass Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          ref={ticketRef}
          className="relative bg-white rounded-[48px] shadow-3xl overflow-hidden border border-gray-100"
        >
          {/* Top Section: Branding & QR */}
          <div className="bg-primary p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex justify-between items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary rotate-12">
                    <FaBus size={16} />
                  </div>
                  <span className="text-xl font-black text-white uppercase italic tracking-tighter">EasyTrip</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Validated Passenger</p>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">{booking.userName || 'N/A'}</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-2xl">
                <QRCode
                  value={`Booking:${booking.id};Bus:${booking.busName};Seats:${booking.seatNumbers?.join(',')}`}
                  size={100}
                />
              </div>
            </div>
          </div>

          {/* Perforation Line Effect */}
          <div className="relative h-12 bg-white flex items-center">
            <div className="absolute left-0 w-8 h-16 bg-gray-50 rounded-full -translate-x-1/2 shadow-inner border-r border-gray-100" />
            <div className="absolute right-0 w-8 h-16 bg-gray-50 rounded-full translate-x-1/2 shadow-inner border-l border-gray-100" />
            <div className="w-full border-t-4 border-dashed border-gray-50 mx-8" />
          </div>

          {/* Journey Details */}
          <div className="p-12 space-y-12">
            <div className="grid grid-cols-2 gap-12 relative">
              {/* Visual Route Line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-10">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <div className="w-[1px] h-6 bg-slate-900" />
                <FaBus size={12} className="text-primary rotate-90" />
                <div className="w-[1px] h-6 bg-slate-900" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <FaMapMarkerAlt size={10} className="text-accent" /> Origin
                </div>
                <p className="text-2xl font-black text-slate-900 uppercase italic leading-none">{booking.startLocation}</p>
              </div>
              <div className="space-y-3 text-right">
                <div className="flex items-center gap-2 justify-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Destination <FaMapMarkerAlt size={10} className="text-accent" />
                </div>
                <p className="text-2xl font-black text-slate-900 uppercase italic leading-none">{booking.endLocation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FaCalendarAlt size={10} className="text-accent" /> Travel Date
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase">{booking.travelDate}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FaClock size={10} className="text-accent" /> Boarding Time
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase">
                    {booking.departureTime
                      ? new Date(booking.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="space-y-8 text-right">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FaIdCard size={10} className="text-accent" /> Allotted Seats
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase">{booking.seatNumbers?.join(', ')}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FaIdCard size={10} className="text-accent" /> Identity Status
                  </div>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Passenger Info Footer */}
            <div className="pt-10 border-t border-gray-100 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Carrier Class</p>
                <p className="text-xs font-black text-slate-900 uppercase tracking-tight italic">{booking.busName}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction Value</p>
                <p className="text-xl font-black text-primary italic tracking-tighter">₹{booking.amount}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed">Present this digital pass at established boarding terminals.<br />Identity verification may be required.</p>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <button
          className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.3em] py-6 rounded-[32px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group"
          onClick={downloadPDF}
        >
          <FaDownload className="text-accent group-hover:-translate-y-1 transition-transform" />
          <span>Download Secured Archive (PDF)</span>
        </button>

        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">Thank you for traveling with EasyTrip Excellence Hub.</p>
      </div>
    </div>
  );
};

export default TicketView;
