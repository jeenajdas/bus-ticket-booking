import React from "react";
import contactImg from "../assets/AboutUs/contact.jpg";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPen, FaPaperPlane, FaBus } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -ml-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[64px] overflow-hidden shadow-2xl relative z-10"
      >
        {/* Left Side:Image */}
        <div className="relative hidden lg:block overflow-hidden">
          <img
            src={contactImg}
            alt="Contact Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 p-16 flex flex-col justify-between text-white">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary rotate-12">
                <FaBus size={20} />
              </div>
              <h5 className="text-2xl font-black uppercase italic tracking-tighter">
                EasyTrip <span className="text-accent">Support</span>
              </h5>
            </div>
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                We're Here <br />
                For You.
              </h2>
              <p className="text-lg font-medium text-white/70 max-w-xs leading-relaxed">
                Join thousands of travelers who trust our priority assistance
                network.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 md:p-20 space-y-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Initiate <span className="text-primary italic">Inquiry</span>
            </h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
              Drop a message to our intelligence team.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Full Identity"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white outline-none rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-gray-300 transition-all font-sans"
                  required
                />
              </div>
              <div className="relative group">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white outline-none rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-gray-300 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <FaPen className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Inquiry Subject"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white outline-none rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-gray-300 transition-all font-sans"
              />
            </div>

            <div className="relative group">
              <textarea
                rows="4"
                placeholder="Your Detailed Message"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white outline-none rounded-[32px] p-8 text-sm font-bold text-slate-900 placeholder:text-gray-300 transition-all font-sans"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-slate-900 text-white font-black uppercase tracking-widest py-5 rounded-[24px] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group active:scale-95"
            >
              <span>Dispatch Message</span>
              <FaPaperPlane
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-accent"
              />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
