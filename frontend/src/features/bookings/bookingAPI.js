import axiosInstance from '../../services/axiosInstance';

export const getAllBookings = async () => {
  const res = await axiosInstance.get('/admin/all-bookings');
  return res.data;
};

export const createBooking = async (bookingData, token) => {
  const res = await axiosInstance.post('/bookings/create', bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ NEW: Get all bookings of current logged-in user
export const getUserBookings = async (token) => {
  const res = await axiosInstance.get('/bookings/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Optional: Download ticket PDF
export const downloadTicket = async (bookingId, token) => {
  const res = await axiosInstance.get(`/bookings/download-ticket/${bookingId}`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ticket_${bookingId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
