import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';
import PopularRoutes from './components/PopularRoutes';
import Dashboard from './pages/admin/Dashboard';
import Auth from './pages/Auth';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import TicketsPage from './pages/TicketsPages';
import SelectSeatsPage from './pages/SelectSeatsPage';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const role= useSelector((state)=> state.auth.role);

  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/about" element={<AboutUs/>}/>
          <Route path='/tickets' element={<TicketsPage/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/select-seats/:busId" element={<SelectSeatsPage />} />
          {/* ✅ Admin dashboard route */}
      {role === 'ADMIN' && (
        <Route path="/admin/dashboard" element={<Dashboard />} />
      )}
        </Routes>
      </Router>
   
  );
};

// Home component with existing sections
const Home = () => {
  return (
    <div>
      <HeroSection />
      <PopularRoutes />
      <WhyChoose />
      <FAQ/>
      <Footer />
    </div>
  );
};

export default App;
