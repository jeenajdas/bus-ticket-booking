import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/FAQ.css";

const faqData = [
  {
    question: "How do I book a bus ticket on EasyTrip?",
    answer:
      "Search buses by entering your source, destination, and travel date. Choose a bus, select your seat, and complete the payment securely.",
  },
  {
    question: "Can I download the ticket after booking?",
    answer:
      "Yes! You’ll receive a confirmation email with your ticket. You can also download it anytime from the 'My Bookings' section.",
  },
  {
    question: "Is cancellation or modification allowed?",
    answer:
      "Currently, cancellation/modification is not supported. Please ensure the travel details are correct before booking.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely. All transactions are encrypted and processed securely through trusted payment gateways.",
  },
];

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="faq-section py-5" id="faq">
      <div className="container">
        <h2 className="text-center faq-title mb-5" data-aos="fade-up">
          Frequently Asked Questions
        </h2>
        <div className="accordion" id="faqAccordion">
          {faqData.map((item, index) => (
            <div
              className="accordion-item"
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
