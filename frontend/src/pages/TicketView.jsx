import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'react-qr-code';
import axiosInstance from '../services/axiosInstance';
import './TicketView.css';

const TicketView = () => {
  const { bookingId } = useParams();
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

  if (!booking) return <div className="text-center mt-5">Loading ticket...</div>;

  return (
    <div className="container py-4">
      <div className="ticket card mx-auto shadow" ref={ticketRef}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 text-primary">🚌 EasyTrip Ticket</h4>
              <small className="text-muted">Booking ID: {booking.bookingId}</small>
            </div>
            <div className="text-center">
              <QRCode
                value={`Booking:${booking.bookingId};Bus:${booking.busName};Seats:${booking.seatNumbers.join(',')}`}
                size={96}
              />
            </div>
          </div>

          <hr />

          <div className="row mb-2">
            <div className="col-md-6">
              <p><strong>Passenger Name:</strong> {booking.user?.name || 'User'}</p>
              <p><strong>Bus:</strong> {booking.busName}</p>
              <p><strong>Route:</strong> {booking.startLocation} → {booking.endLocation}</p>
              <p><strong>Date:</strong> {new Date(booking.bookingTime).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Seats:</strong> {booking.seatNumbers.join(', ')}</p>
              <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
              <p><strong>Time:</strong> {new Date(booking.bookingTime).toLocaleTimeString()}</p>
            </div>
          </div>

          <hr />

          <div className="text-center text-muted small">
            Thank you for booking with <strong>EasyTrip</strong>. Have a safe journey!
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary px-4" onClick={downloadPDF}>
          Download Ticket PDF
        </button>
      </div>
    </div>
  );
};

export default TicketView;
