import React from 'react';
import { Clock, ShieldCheck, Wallet } from 'lucide-react';
import '../styles/WhyChoose.css';

const WhyChoose = () => {
  return (
    <section className="why-choose py-5" id="why">
      <div className="container">
        <h2 className="text-center mb-5" data-aos="fade-up">Why Choose EasyTrip?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="100">
            <Clock size={40} className="mb-3" />
            <h5>On-time Departures</h5>
            <p>We value your time. Always punctual.</p>
          </div>
          <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
            <ShieldCheck size={40} className="mb-3" />
            <h5>Safe & Secure</h5>
            <p>Verified buses, tracked journeys.</p>
          </div>
          <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="300">
            <Wallet size={40} className="mb-3" />
            <h5>Affordable Prices</h5>
            <p>Best fares with amazing discounts.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
