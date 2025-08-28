import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';
import PopularRoutes from './components/PopularRoutes';

import Auth from './pages/Auth';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import TicketsPage from './pages/TicketsPages';
import SelectSeatsPage from './pages/SelectSeatsPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingSuccess from './pages/BookingSuccess';
import MyBookings from './pages/MyBookings';
import TicketView from './pages/TicketView';
import Dashboard from "./pages/admin/Dashboard";
import ManageBuses from "./pages/admin/ManageBuses";

import AdminLayout from "./layouts/AdminLayout";
import Bookings from "./pages/admin/Bookings";
import Reports from "./pages/admin/Reports";
import Users from "./pages/admin/Users";
import Profile from "./pages/admin/Profile";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const role = useSelector((state) => state.auth.role);

  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/select-seats/:busId" element={<SelectSeatsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/ticket/:bookingId" element={<TicketView />} />

        {/* ✅ Admin dashboard route */}
        {role === "ADMIN" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-buses" element={<ManageBuses />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

// Hide Navbar on admin routes
const ConditionalNavbar = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    return null; // ✅ Don't render Navbar in admin routes
  }
  return <Navbar />;
};

// Home component with existing sections
const Home = () => {
  return (
    <div>
      <HeroSection />
      <PopularRoutes />
      <WhyChoose />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
