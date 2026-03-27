import React from "react";
import { motion } from "framer-motion";
import team1 from '../assets/AboutUs/team1.jpg';
import team3 from '../assets/AboutUs/team3.jpg';
import kochi from '../assets/AboutUs/ourvision2.avif';
import user4 from '../assets/AboutUs/user4.jpg';
import user2 from '../assets/AboutUs/user2.avif';
import user1 from '../assets/AboutUs/user1.avif';
import { FaRocket, FaShieldAlt, FaHeadset, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
            Our <span className="text-accent">Story</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-[.4em]">
            <span>Home</span>
            <div className="w-8 h-px bg-accent/30" />
            <span className="text-accent">About Us</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 space-y-32 pb-32">

        {/* Our Mission */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={team1} alt="Our Mission" className="relative w-full h-[500px] object-cover rounded-[48px] shadow-2xl" />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Mission Critical
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Revolutionizing <br /><span className="text-primary italic">Every Journey</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
              At <strong className="text-slate-900">EasyTrip</strong>, we believe travel should be more than just moving from A to B. We're building the future of intercity transport through smart tech and human-centric design.
            </p>
          </motion.div>
        </motion.section>

        {/* Why Choose Us */}
        <section className="bg-primary rounded-[64px] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-40 -mt-20" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative z-10 grid lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                The EasyTrip <br /><span className="text-accent">Edge</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: FaRocket, text: "Instant Priority Booking" },
                  { icon: FaShieldAlt, text: "Secure Payment Network" },
                  { icon: FaHeadset, text: "24/7 Dedicated Support" },
                  { icon: FaUsers, text: "Joy of 1M+ Travelers" },
                  { icon: FaMapMarkedAlt, text: "Real-Time GPS Tracking" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-slate-900 transition-all border border-white/10">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-black text-white/70 uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={team3} alt="Excellence" className="w-full h-[600px] object-cover rounded-[48px] shadow-3xl" />
            </div>
          </motion.div>
        </section>

        {/* Our Vision */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse flex flex-col"
        >
          <motion.div variants={itemVariants} className="md:order-2">
            <img src={kochi} alt="Our Vision" className="w-full h-[500px] object-cover rounded-[48px] shadow-2xl" />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-8 md:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-slate-900 text-[10px] font-black uppercase tracking-widest">
              Future Focused
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              A World Without <br /><span className="text-primary italic">Travel Barriers</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
              Our vision is to make every city accessible with a single tap. We're committed to sustainable, efficient, and exciting transportation for the next generation.
            </p>
          </motion.div>
        </motion.section>

        {/* Testimonials */}
        <section className="text-center py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-20"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Voice of the <span className="text-primary italic">Traveler</span></h2>
              <div className="w-24 h-2 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { img: user4, name: "Anjali R.", quote: "Hassle-free booking, premium comfort, and absolute peace of mind." },
                { img: user2, name: "Vikram M.", quote: "Real-time tracking is a game changer. My primary choice for intercity travel." },
                { img: user1, name: "Priya N.", quote: "The most intuitive interface I've ever used. Simply exceptional service." }
              ].map((u, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15 }}
                  className="bg-white p-12 rounded-[48px] shadow-xl border border-gray-50 flex flex-col items-center group transition-all"
                >
                  <div className="relative mb-8">
                    <div className="absolute -inset-2 bg-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src={u.img} alt={u.name} className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  </div>
                  <p className="text-base text-slate-500 font-bold italic leading-relaxed mb-6">"{u.quote}"</p>
                  <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">{u.name}</h5>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
