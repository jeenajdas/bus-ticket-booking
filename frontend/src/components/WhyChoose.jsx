import React from "react";
import Reveal from "../components/Reveal";
import { Shield, Clock, CreditCard, Bus } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Bus size={24} />,
    title: "Instant Booking",
    description: "Confirm seats in seconds with our lightning-fast search and checkout process.",
    accent: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: <Shield size={24} />,
    title: "Safe & Secure",
    description: "Bank-grade encryption ensures your passenger details and payments are always protected.",
    accent: "bg-green-500/10 text-green-500"
  },
  {
    icon: <CreditCard size={24} />,
    title: "Zero Fees",
    description: "Enjoy transparent pricing with no hidden charges or surprise convenience fees.",
    accent: "bg-accent/20 text-slate-900"
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Priority",
    description: "Round-the-clock dedicated assistance for cancellations, refunds, or trip changes.",
    accent: "bg-purple-500/10 text-purple-500"
  },
];

const WhyChooseEasyTrip = () => {
  return (
    <section className="bg-slate-50 py-32 rounded-[64px] mx-4 md:mx-10 my-20 overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-40 -mb-20" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div className="space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Why Choose EasyTrip
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">
                Travel Smarter <br />
                <span className="text-primary italic">With Confidence</span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                Built for the modern traveler. We combine cutting-edge technology with trusted operators to deliver a premium journey every single time.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-50 overflow-hidden bg-gray-200">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">10k+ Daily Travelers</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Join the community</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <Reveal key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[48px] shadow-2xl shadow-primary/5 border border-white h-full group transition-all"
                >
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${item.accent}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic mb-4">{item.title}</h4>
                  <p className="text-sm text-slate-400 font-bold leading-relaxed">{item.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseEasyTrip;
