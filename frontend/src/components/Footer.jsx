import React from 'react';
import '../styles/Footer.css';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer glassy-box text-white py-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">EasyTrip</h5>
            <p>Your go-to platform for smooth and reliable bus bookings across India.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Search Buses</a></li>
              <li><a href="#">My Bookings</a></li>
              <li><a href="#">Offers</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-4">
            <h6>Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h6>Contact</h6>
            <ul className="list-unstyled">
              <li><MapPin size={16} /> Kerala, India</li>
              <li><Phone size={16} /> +91 98765 43210</li>
              <li><Mail size={16} /> support@easytrip.com</li>
            </ul>
          </div>
        </div>

        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">© 2025 EasyTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
