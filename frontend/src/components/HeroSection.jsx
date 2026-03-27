import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill in all fields");
      return;
    }
    navigate(
      `/tickets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to,
      )}&date=${date}`,
    );
  };

  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative h-[90vh] min-h-[700px] overflow-hidden flex items-center">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="/speed bus1.jpg"
            alt="Premium Bus Service"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        </div>

        {/* Animated Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20"
        >
          <div className="max-w-3xl">
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase italic"
            >
              Travel{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Smarter
              </span>
              .
              <br />
              <span className="text-white">Arrive Better.</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-xl text-white/70 leading-relaxed font-bold max-w-xl"
            >
              Experience the next generation of bus travel. Premium seats,
              on-time departures, and a seamless booking process tailored for
              you.
            </motion.p>

            {/* Premium Search Card */}
            <motion.div
              variants={itemVariants}
              className="mt-12 bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-[32px] flex flex-col lg:flex-row items-stretch gap-2 shadow-2xl shadow-black/40 group"
            >
              {/* From */}
              <div className="relative flex-1 bg-white/95 rounded-3xl p-4 flex items-center gap-4 group/input border-2 border-transparent focus-within:border-accent transition-all">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-focus-within/input:bg-accent group-focus-within/input:text-slate-900 transition-colors">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Departure
                  </p>
                  <input
                    type="text"
                    placeholder="Source City"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="outline-none w-full text-lg font-black text-slate-900 placeholder:text-gray-300 bg-transparent"
                  />
                </div>
              </div>

              {/* To */}
              <div className="relative flex-1 bg-white/95 rounded-3xl p-4 flex items-center gap-4 group/input border-2 border-transparent focus-within:border-accent transition-all">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-focus-within/input:bg-accent group-focus-within/input:text-slate-900 transition-colors">
                  <FaLocationArrow size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Destination
                  </p>
                  <input
                    type="text"
                    placeholder="Going To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="outline-none w-full text-lg font-black text-slate-900 placeholder:text-gray-300 bg-transparent"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="relative flex-1 bg-white/95 rounded-3xl p-4 flex items-center gap-4 group/input border-2 border-transparent focus-within:border-accent transition-all">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-focus-within/input:bg-accent group-focus-within/input:text-slate-900 transition-colors">
                  <div className="font-black text-sm">📅</div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Date
                  </p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="outline-none w-full text-lg font-black text-slate-900 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="bg-accent hover:bg-accent-dark text-slate-900 font-black uppercase tracking-widest px-10 py-6 lg:py-4 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-accent/20 flex items-center justify-center gap-2"
              >
                Find Buses
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
