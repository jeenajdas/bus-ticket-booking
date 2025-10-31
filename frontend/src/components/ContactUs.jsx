import React from 'react';
import '../styles/ContactUs.css';
import contactImg from '../assets/AboutUs/contact.jpg'; // replace with your real image

const ContactUs = () => {
  return (
    <section className="contact-modern">
      <div className="overlay">
        <div className="container contact-container">
          <div className="contact-heading">
            <h2>Let’s Talk</h2>
            <p>We’d love to hear from you. Drop us a message!</p>
          </div>

          <div className="contact-content">
            <div className="contact-image">
              <img src={contactImg} alt="Contact Us" />
            </div>

            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="text" placeholder="Subject" />
              <textarea rows="4" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
