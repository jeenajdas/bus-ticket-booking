import React, { useEffect } from "react";
import "../styles/AboutUs.css";
import AOS from "aos";
import "aos/dist/aos.css";

import team1 from '../assets/AboutUs/team1.jpg';
import team3 from '../assets/AboutUs/team3.jpg';
import kochi from '../assets/AboutUs/ourvision2.avif';
import user4 from '../assets/AboutUs/user4.jpg';
import user2 from '../assets/AboutUs/user2.avif';
import user1 from '../assets/AboutUs/user1.avif';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-us">

      {/* Banner */}
      <div className="about-banner">
        <div className="overlay">
          <h1 data-aos="fade-down">ABOUT US</h1>
          <p data-aos="fade-up">Home &nbsp;/&nbsp; About Us</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="about-content container-fluid py-5 px-4 px-md-5">
        <div className="row align-items-center mb-5 text-white" data-aos="fade-right">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={team1} alt="Our Mission" className="img-fluid rounded shadow-lg" />
          </div>
          <div className="col-md-6">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              At <strong>EasyTrip</strong>, our mission is to revolutionize bus travel by making it seamless, affordable, and tech-driven. We empower travelers with smart booking, real-time tracking, and a joyful experience across every journey.
            </p>
          </div>
        </div>

        <div className="highlight-section dark-section py-5" data-aos="zoom-in-up">
          <div className="row align-items-center text-white">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src={team3} alt="Why Choose Us" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">Why Choose EasyTrip?</h2>
              <ul className="about-list">
                <li>🚀 Instant & Reliable Booking</li>
                <li>🔒 Secure Payment Gateways</li>
                <li>📞 24x7 Friendly Support</li>
                <li>🚌 Trusted by Thousands of Travelers</li>
                <li>📍 Real-Time Bus Tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row align-items-center mb-5 text-white flex-md-row-reverse" data-aos="fade-left">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={kochi} alt="Our Vision" className="img-fluid rounded shadow-lg" />
          </div>
          <div className="col-md-6">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-text">
              We dream of a world where travel is stress-free, sustainable, and exciting. EasyTrip is committed to reshaping public transportation with innovative tools and a deep understanding of what travelers need.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section text-white py-5 px-4" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-5">✨ What Our Users Say</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="testimonial-card rounded shadow-lg">
                <img src={user4} alt="User" className="testimonial-img rounded-circle mb-3" />
                <p className="testimonial-text">"EasyTrip made my travel hassle-free. Booking was smooth, support was great, and the ride was very comfortable!"</p>
                <h5 className="testimonial-name">Anjali R.</h5>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card rounded shadow-lg">
                <img src={user2} alt="User" className="testimonial-img rounded-circle mb-3" />
                <p className="testimonial-text">"Loved the real-time tracking and instant confirmation. EasyTrip is now my go-to for intercity bus travel."</p>
                <h5 className="testimonial-name">Vikram M.</h5>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card rounded shadow-lg">
                <img src={user1} alt="User" className="testimonial-img rounded-circle mb-3" />
                <p className="testimonial-text">"Exceptional experience. EasyTrip’s interface is intuitive and their service is top-notch. Highly recommended!"</p>
                <h5 className="testimonial-name">Priya N.</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
