import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full shadow-lg shadow-accent/20" />
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => toggleFAQ(index)}
              className={`group border-2 transition-all duration-500 rounded-3xl p-8 cursor-pointer
                ${activeIndex === index
                  ? 'bg-slate-50 border-primary shadow-2xl shadow-primary/5'
                  : 'bg-white border-gray-100 hover:border-accent hover:shadow-xl hover:shadow-accent/5'}
              `}
            >
              {/* Question */}
              <div className="flex justify-between items-center gap-6">
                <h3 className={`text-lg md:text-xl font-extrabold transition-colors duration-300
                  ${activeIndex === index ? 'text-primary' : 'text-slate-700 group-hover:text-primary'}
                `}>
                  {item.question}
                </h3>

                <motion.div
                  animate={{
                    rotate: activeIndex === index ? 180 : 0,
                    scale: activeIndex === index ? 1.2 : 1
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`${activeIndex === index ? 'text-primary' : 'text-gray-300 group-hover:text-accent'}`}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 text-slate-600 leading-relaxed font-medium md:text-lg border-t border-gray-100 pt-6">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;